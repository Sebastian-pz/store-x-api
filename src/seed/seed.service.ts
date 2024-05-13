import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import seedProducts from './data/seed.data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async loadSeed() {
    await this.productService.developmentRemoveAllProductos();
    await this.insertManyProducts();
    return 'Loading seed...';
  }

  private async insertManyProducts() {
    const insertPromises = [];
    seedProducts.forEach((product) => {
      insertPromises.push(this.productService.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
