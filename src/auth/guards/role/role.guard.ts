import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protection/role-protection.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler()
    );

    if (!validRoles || !validRoles.length) return true;

    // Getting user info

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) throw new BadRequestException('Error getting user');

    const isAuthorized = this.validateRoles(user.roles, validRoles);
    if (!isAuthorized) throw new ForbiddenException('User has no permissions');
    return isAuthorized;
  }

  validateRoles(userRoles: string[], requiredRoles: string[]) {
    for (const role of userRoles) {
      if (requiredRoles.includes(role)) return true;
    }

    return false;
  }
}
