import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import ErrorHandler from 'src/common/handler/error.handler';
import encryptPassword from './utils/passwordEncrypt.utils';
import { CreateUserDto, LoginDto } from './dto';
import comparePasswords from './utils/passwordComparer.util';
import JwtPayload from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly errorHandler: ErrorHandler
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = encryptPassword(createUserDto.password);
      const instanceOfUser = this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(instanceOfUser);
      const token = this.generateJwt({ id: user.id });

      return {
        ...user,
        token
      };
    } catch (error) {
      this.errorHandler.handle('Auth/Service Create user', error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email } = loginDto;
      const userInDb = await this.userRepository.findOne({
        where: { email },
        select: { password: true, id: true }
      });
      if (!userInDb) throw new UnauthorizedException('Invalid credentials');

      const isCorrectPassword = await comparePasswords(
        loginDto.password,
        userInDb.password
      );

      if (!isCorrectPassword)
        throw new UnauthorizedException('Invalid credentials');

      const token = this.generateJwt({ id: userInDb.id });
      return {
        token
      };
    } catch (error) {
      this.errorHandler.handle('Auth/Service Login', error);
    }
  }

  async checkAuthStatus(user: User) {
    return {
      token: this.generateJwt({ id: user.id })
    };
  }

  private generateJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
