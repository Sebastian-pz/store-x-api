import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import USER_ROLES from '../constants/roles';

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
}
