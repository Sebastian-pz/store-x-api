import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Representation of the file in the database

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  title: string;

  @Column('numeric', {
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
}
