import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import ErrorHandler from 'src/common/handler/error.handler';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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

  async findOne(id: string) {
    try {
      const productToFind = await this.productRepository.findOneBy({ id });
      if (!productToFind)
        throw new NotFoundException(`Product ${id} not found`);

      return productToFind;
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
