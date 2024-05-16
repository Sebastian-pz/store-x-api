import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      'roles',
      context.getHandler()
    );

    if (!validRoles || !validRoles.length) return true;

    // Getting user info

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) throw new BadRequestException('Error getting user');

    const isValid = this.validateRoles(user.roles, validRoles);
    if (!isValid) throw new ForbiddenException('User has no permissions');
    return true;
  }

  validateRoles(userRoles: string[], requiredRoles: string[]) {
    for (const role of userRoles) {
      if (requiredRoles.includes(role)) return true;
    }

    return false;
  }
}
