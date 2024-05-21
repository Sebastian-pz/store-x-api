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
import { ApiProperty } from '@nestjs/swagger';
import { GENDERS, SIZES } from '../dto/constants/product.constants';

// Representation of the file in the database

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true
  })
  title: string;

  @ApiProperty({
    default: 0.0
  })
  @Column('float', {
    nullable: false,
    default: 0.0
  })
  price: number;

  @ApiProperty({ nullable: true })
  @Column('text', {
    nullable: true
  })
  description: string;

  @ApiProperty()
  @Column('text', {
    unique: true
  })
  slug: string;

  @ApiProperty({ default: 0 })
  @Column('int', {
    default: 0
  })
  stock: number;

  @ApiProperty({
    example: SIZES,
    enum: SIZES
  })
  @Column('text', {
    array: true
  })
  sizes: string[];

  @ApiProperty({
    enum: GENDERS,
    example: GENDERS[0]
  })
  @Column('text', {
    nullable: false
  })
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: []
  })
  tags: string[];

  // Relations with users
  @ManyToOne(() => User, (user) => user.product, { onDelete: 'CASCADE' })
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
