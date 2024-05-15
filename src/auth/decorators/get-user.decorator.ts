import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user)
      throw new InternalServerErrorException('[Server] user not found');

    switch (data) {
      case 'roles':
        return { roles: user.roles };

      case 'isActive':
        return { isActive: user.isActive };

      default:
        return user;
    }
  }
);
