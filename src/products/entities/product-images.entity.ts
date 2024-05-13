import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  url: string;

  @Column()
  alt: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE'
  })
  product?: Product;
}
