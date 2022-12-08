import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ORDER_STATUS } from 'src/order/enum/orderStatus.enum';

@Injectable()
export class RedisCacheService {
  private readonly redisClient: Redis;
  constructor(private redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }

  async getCachedOrder(cafeId, orderId): Promise<ORDER_STATUS | null> {
    const status = await this.redisClient.hget(cafeId, orderId);
    if (status === ORDER_STATUS.REQUESTED) return ORDER_STATUS.REQUESTED;
    else if (status === ORDER_STATUS.ACCEPTED) return ORDER_STATUS.ACCEPTED;
    else if (status === ORDER_STATUS.REJECTED) return ORDER_STATUS.REJECTED;
    else return null;
  }

  async insertCachedOrder(cafeId, orderId, status) {
    const result = await this.redisClient.hset(cafeId, orderId, status);
    return result;
  }

  async updateCachedOrder(cafeId, orderId, status) {
    const result = await this.redisClient.hset(cafeId, orderId, status);
    return result;
  }

  async deleteCachedOrder(cafeId, orderId) {
    const result = await this.redisClient.hdel(cafeId, orderId);
    return result;
  }

  async getAllCachedOrders(cafeId: string) {
    const result = await this.redisClient.hgetall(cafeId);
    return result;
  }
}
