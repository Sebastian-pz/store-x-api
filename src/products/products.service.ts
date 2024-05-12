import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import ErrorHandler from 'src/common/handler/error.handler';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {
  // Patron repositorio
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly errorHandler: ErrorHandler
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      // Creating instance of product
      const product = this.productRepository.create(createProductDto);

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
        skip: offset
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
        const queryBuilder = this.productRepository.createQueryBuilder();

        product = await queryBuilder
          .where(`title =:title or slug =:slug`, {
            title: term,
            slug: term
          })
          .getOne();
      }

      if (!product) throw new NotFoundException(`Product ${term} not found`);

      return product;
    } catch (error) {
      this.errorHandler.handle('Product/Service - findOne', error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const update = await this.productRepository.update(
        { id },
        updateProductDto
      );

      if (!update.affected)
        throw new NotFoundException(`Product ${id} not found and updated`);

      return { message: 'updated successfully', status: 200 };
    } catch (error) {
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
}
