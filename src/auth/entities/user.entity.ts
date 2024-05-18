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

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true
  })
  isActive: boolean;

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
