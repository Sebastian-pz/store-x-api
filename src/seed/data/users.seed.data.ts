import { SeedUser } from './seed.interfaces';
import USER_ROLES from 'src/auth/constants/roles';

export const usersSeed: SeedUser[] = [
  {
    email: 'johndoe@example.com',
    fullName: 'John Doe',
    password: 'password123',
    roles: [USER_ROLES.client]
  },
  {
    email: 'janesmith@example.com',
    fullName: 'Jane Smith',
    password: 'secret456',
    roles: [USER_ROLES.client]
  },
  {
    email: 'davidjones@example.com',
    fullName: 'David Jones',
    password: 'strong!password',
    roles: [USER_ROLES.client]
  },
  {
    email: 'emilybrown@example.com',
    fullName: 'Emily Brown',
    password: 'secure789',
    roles: [USER_ROLES.client]
  },
  {
    email: 'michaelwilson@example.com',
    fullName: 'Michael Wilson',
    password: 'password101',
    roles: [USER_ROLES.client]
  }
];
