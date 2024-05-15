import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    console.log(data);

    const request = context.switchToHttp().getRequest();

    const { user } = request;

    if (!user)
      throw new InternalServerErrorException('[Server] user not found');

    return user;
  }
);
