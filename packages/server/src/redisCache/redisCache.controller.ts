import { Controller, Get } from '@nestjs/common';
import { RedisCacheService } from './redisCache.service';

@Controller()
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  @Get('/reconnect')
  async getRequestedOrders() {
    return await this.redisCacheService.reconnect();
  }
}
