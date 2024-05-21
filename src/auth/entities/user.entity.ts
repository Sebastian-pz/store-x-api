import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import USER_ROLES from '../constants/roles';
import { Product } from 'src/products/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ uniqueItems: true })
  @Column('text', {
    unique: true
  })
  email: string;

  @ApiProperty()
  @Column('text')
  password: string;

  @ApiProperty()
  @Column('text')
  fullName: string;

  @ApiProperty({ default: true })
  @Column('bool', {
    default: true
  })
  isActive: boolean;

  @ApiProperty({
    enum: USER_ROLES,
    example: [USER_ROLES.client]
  })
  @Column('text', {
    array: true,
    default: [USER_ROLES.client]
  })
  roles: string[];

  // Relations with products
  @OneToMany(() => Product, (product) => product.user, { cascade: true })
  product: Product;

  // "Triggers"

  @BeforeInsert()
  normalizeInsert() {
    this.email = this.email.toLowerCase();
    this.fullName = this.fullName.trim().toLowerCase();
  }

  @BeforeUpdate()
  normalizeUpdate() {
    this.email = this.email.toLowerCase();
    this.fullName = this.fullName.trim().toLowerCase();
  }
}
