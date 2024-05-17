import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import USER_ROLES from 'src/auth/constants/roles';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(USER_ROLES.admin)
  executeSeed() {
    return this.seedService.loadSeed();
  }
}
