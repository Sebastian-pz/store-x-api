import { SeedUser } from './seed.interfaces';
import USER_ROLES from 'src/auth/constants/roles';

export const usersSeed: SeedUser[] = [
  {
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    password: 'password123',
    roles: [USER_ROLES.client]
  },
  {
    email: 'jane.smith@example.com',
    fullName: 'Jane Smith',
    password: 'secret456',
    roles: [USER_ROLES.client]
  },
  {
    email: 'david.jones@example.com',
    fullName: 'David Jones',
    password: 'strong!password',
    roles: [USER_ROLES.client]
  },
  {
    email: 'emily.brown@example.com',
    fullName: 'Emily Brown',
    password: 'secure789',
    roles: [USER_ROLES.client]
  },
  {
    email: 'michael.wilson@example.com',
    fullName: 'Michael Wilson',
    password: 'password101',
    roles: [USER_ROLES.client]
  }
];
