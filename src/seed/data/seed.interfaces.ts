import { ProductImage } from 'src/products/entities';

export interface SeedProducts {
  title: string;
  price: number;
  stock: number;
  sizes: ('x' | 'xs' | 's' | 'm')[];
  gender: 'male' | 'female' | 'unisex';
  tags: string[];
  images: ProductImage[];
}

export interface Image {
  url: string;
  alt: string;
}

export interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}
