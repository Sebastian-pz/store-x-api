import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

export const RoleProtection = (...args: string[]) =>
  SetMetadata('role-protection', args);
