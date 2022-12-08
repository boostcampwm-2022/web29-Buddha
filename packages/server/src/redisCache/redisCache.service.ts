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

  async getCachedOrder(
    key: string,
    orderId: string
  ): Promise<ORDER_STATUS | null> {
    const status = await this.redisClient.hget(key, orderId);
    if (status === ORDER_STATUS.REQUESTED) return ORDER_STATUS.REQUESTED;
    else if (status === ORDER_STATUS.ACCEPTED) return ORDER_STATUS.ACCEPTED;
    else if (status === ORDER_STATUS.REJECTED) return ORDER_STATUS.REJECTED;
    else return null;
  }

  async insertCachedOrder(key: string, orderId: string, status: ORDER_STATUS) {
    const result = await this.redisClient.hset(key, orderId, status);
    return result;
  }

  async updateCachedOrder(
    cafeId: string,
    orderId: string,
    status: ORDER_STATUS
  ) {
    const result = await this.redisClient.hset(cafeId, orderId, status);
    return result;
  }

  async deleteCachedOrder(key: string, orderId: string) {
    const result = await this.redisClient.hdel(key, orderId);
    return result;
  }

  async getAllCachedOrders(cafeId: string) {
    const result = await this.redisClient.hgetall(cafeId);
    return result;
  }
}
