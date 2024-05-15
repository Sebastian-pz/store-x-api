import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, CreateUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, request } from 'express';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

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
  getUsers(@GetUser('isActive') user: User) {
    return [user];
  }
}
