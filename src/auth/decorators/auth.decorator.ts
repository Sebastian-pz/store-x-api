import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtection } from './role-protection/role-protection.decorator';
import { RoleGuard } from '../guards/role/role.guard';

export function Auth(...roles: string[]) {
  return applyDecorators(
    RoleProtection(...roles),
    UseGuards(AuthGuard(), RoleGuard)
  );
}
