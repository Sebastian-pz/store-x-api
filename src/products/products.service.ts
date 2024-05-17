import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import ErrorHandler from 'src/common/handler/error.handler';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { Product, ProductImage } from './entities';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProductsService {
  // Patron repositorio
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,

    private readonly errorHandler: ErrorHandler
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const { images = [], ...productDetails } = createProductDto;

      const instancedImages = images.map((image) => {
        return this.productImageRepository.create({
          alt: image.alt,
          url: image.url
        });
      });

      // Creating instance of product
      const product = this.productRepository.create({
        ...productDetails,
        images: instancedImages,
        user
      });

      // Saving product in the database
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.errorHandler.handle('Product/Service - Create', error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        // Get info from relations
        relations: {
          images: true
        }
      });
      return products;
    } catch (error) {
      this.errorHandler.handle('Product/Service - findAll', error);
    }
  }

  async findOne(term: string) {
    try {
      let product: Product;

      if (isUUID(term))
        product = await this.productRepository.findOneBy({ id: term });
      else {
        // product = await this.productRepository.findOneBy({ slug: term });

        // Creating a query builder -> Prevents SQL injections
        const queryBuilder =
          this.productRepository.createQueryBuilder('product');

        product = await queryBuilder
          .where(`title=:title or slug=:slug`, {
            title: term.toLowerCase(),
            slug: term.toLowerCase()
          })
          .leftJoinAndSelect('product.images', 'productImages')
          .getOne();
      }

      if (!product) throw new NotFoundException(`Product ${term} not found`);

      return product;
    } catch (error) {
      console.log(error);
      this.errorHandler.handle('Product/Service - findOne', error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    // Creating a queryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { images, ...restProduct } = updateProductDto;
      const product = await this.productRepository.preload({
        id,
        ...restProduct
      });

      if (!product)
        throw new NotFoundException(`Product ${id} not found and updated`);

      if (images) {
        // Delete from table ProductImage -> Where productID = product.id
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        // Creating instances of ProductImage using my productImageRepository
        product.images = images.map((image) =>
          this.productImageRepository.create({
            alt: image.alt,
            url: image.url
          })
        );
      }

      product.user = user;
      // Saving changes
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();

      // !Close queryRunner
      await queryRunner.release();
      return this.findOne(id);
    } catch (error) {
      // If something goes bad queryRunner execute a rollback
      await queryRunner.rollbackTransaction();

      // !Close queryRunner
      await queryRunner.release();
      this.errorHandler.handle('Products/Service - update', error);
    }
  }

  async remove(id: string) {
    try {
      const productToDeleted = await this.productRepository.delete(id);
      if (productToDeleted.affected)
        return { message: 'removed successfully', status: 200 };
      throw new NotFoundException(`Product ${id} not found`);
    } catch (error) {
      this.errorHandler.handle('Product/Service - Remove', error);
    }
  }

  async developmentRemoveAllProductos() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query.delete().execute();
    } catch (error) {
      this.errorHandler.handle(
        'Product/Service - [DEV] RemoveAllProducts',
        error
      );
    }
  }
}
