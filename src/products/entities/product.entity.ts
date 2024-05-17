import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ProductImage } from './product-images.entity';
import { User } from 'src/auth/entities/user.entity';

// Representation of the file in the database

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  title: string;

  @Column('float', {
    nullable: false,
    default: 0.0
  })
  price: number;

  @Column('text', {
    nullable: true
  })
  description: string;

  @Column('text', {
    unique: true
  })
  slug: string;

  @Column('int', {
    default: 0
  })
  stock: number;

  @Column('text', {
    array: true
  })
  sizes: string[];

  @Column('text', {
    nullable: false
  })
  gender: string;

  @Column('text', {
    array: true,
    default: []
  })
  tags: string[];

  // Relations with users
  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  // A product can have many images
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    // So that when a FIND is used, the images are automatically loaded
    // Automatic join
    eager: true
  })
  images?: ProductImage[];

  @BeforeInsert()
  normalizeInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = createSlug(this.slug);
    this.title = this.title.toLowerCase();
  }

  @BeforeUpdate()
  normalizeUpdate() {
    if (this.title) this.title = this.title.toLowerCase();
    if (this.slug) this.slug = createSlug(this.slug);
  }
}

function createSlug(title: string) {
  return title.toLocaleLowerCase().replaceAll(' ', '_').replaceAll("'", '');
}
