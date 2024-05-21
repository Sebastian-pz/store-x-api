import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

import { Auth, GetUser, RoleGuard, RoleProtection } from './decorators';
import USER_ROLES from './constants/roles';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: User
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request'
  })
  @ApiResponse({
    status: 403,
    description: 'Token related'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  // -----------------| Authentication and authorization check routes |-----------------

  @Get('private')
  @UseGuards(AuthGuard()) // -> require to be authenticated
  testingAuthorization() {
    return {
      ok: true,
      message: 'you have access'
    };
  }

  @Get('private/users')
  @UseGuards(AuthGuard())
  getUsers(@GetUser() user: User, @Headers() headers: IncomingHttpHeaders) {
    return [user, headers];
  }

  // @SetMetadata('roles', [USER_ROLES.admin])
  @Get('private/admin')
  @RoleProtection(USER_ROLES.admin)
  @UseGuards(AuthGuard(), RoleGuard)
  getAdminRoute(@GetUser() user: User) {
    return {
      user,
      message: "You're in admin route"
    };
  }

  // Best way to create a authorization controller -> Compose decorator
  @Get('private/compose-decorator')
  @Auth(USER_ROLES.admin)
  getComposeDecoratorRoute() {
    return {
      message: "You'r in compose decorator route"
    };
  }
}
