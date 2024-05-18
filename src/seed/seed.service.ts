import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities';

import { usersSeed, productsSeed } from './data';
import { SeedUser } from './data/seed.interfaces';

import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // !This is a destructive action! Removes all products
  async deleteProducts() {
    const queryBuilder = this.productRepository.createQueryBuilder();

    await queryBuilder.delete().where({}).execute();
  }

  // !This is a destructive action! Removes all users
  async deleteUsers() {
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const users: User[] = [];

    const validUsers = await this.getUsersWithValidPassword(usersSeed);

    // Instance users
    validUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    // Save users to db
    await this.userRepository.save(users);

    // Return a default user to create products
    return users[0];
  }

  private async insertProducts(user: User) {
    const products: Product[] = [];

    productsSeed.forEach((product) => {
      products.push(this.productRepository.create({ user, ...product }));
    });

    // Save products to DB
    await this.productRepository.save(products);

    // seedProducts.forEach((product) => {
    //   insertPromises.push(this.productService.create(product));
    // });

    // await Promise.all(insertPromises);

    return true;
  }

  private async getUsersWithValidPassword(
    users: SeedUser[]
  ): Promise<SeedUser[]> {
    const validUsers: SeedUser[] = [];

    for (const user of users) {
      validUsers.push({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      });
    }

    return validUsers;
  }

  async loadSeed() {
    // await this.deleteProducts();
    await this.deleteUsers();
    const defaultUser = await this.insertUsers();
    await this.insertProducts(defaultUser);
    return 'Loading seed...';
  }
}
