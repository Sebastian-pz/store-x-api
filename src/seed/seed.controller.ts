import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';
// import { Auth } from 'src/auth/decorators';
// import USER_ROLES from 'src/auth/constants/roles';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(USER_ROLES.admin)
  executeSeed() {
    return this.seedService.loadSeed();
  }
}
