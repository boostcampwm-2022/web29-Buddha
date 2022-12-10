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

  async insertNewOrderV3(cafeKey: string, orderId: number, value: string) {
    // 고객이 새로운 주문을 생성한 경우
    const result = await this.redisClient.zadd(cafeKey, orderId, value);
    return result;
  }

  async getCachedOrderV3(
    cafeKey: string,
    orderId: number
  ): Promise<Array<string>> {
    // 점주가 특정 주문을 찾는 경우 - 주문 상태 업데이트 전에 검증용으로 호출
    const result = await this.redisClient.zrangebyscore(
      cafeKey,
      orderId,
      orderId
    );
    return result;
  }

  async getCachedOrderStatusV3(cafeKey: string, orderId: string) {
    // 고객의 주문 상태 조회
    const result = await this.redisClient.hget(cafeKey, orderId);
    return result;
  }

  async getNewCachedOrdersV3(cafeKey: string, startingOrderId: number) {
    // 점주의 새 주문 조회(점주 기준 새 주문)
    const result = await this.redisClient.zrangebyscore(
      cafeKey,
      startingOrderId,
      'inf'
    );
    return result;
  }

  async deleteCachedOrderV3(cafeKey: string, orderId: number) {
    // 점주가 주문 수락시
    const result = await this.redisClient.zremrangebyscore(
      cafeKey,
      orderId,
      orderId
    );
    return result;
  }

  async updateOrderStatusV3(
    cafeKey: string,
    orderId: number,
    orderStatus: ORDER_STATUS
  ) {
    // 점주가 클라이언트가 조회하는 자료구조에 있는 주문 상태를 업데이트
    const result = await this.redisClient.hset(cafeKey, orderId, orderStatus);
    return result;
  }
}
