import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

import { GetUser } from './decorators';
import { IncomingHttpHeaders } from 'http';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

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
}
