import { OrderService } from './../../../src/order/order.service';
import { OrderModule } from './../../../src/order/order.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { setNestApp } from 'src/setNestApp';
import { AppModule } from 'src/app.module';
import { OrderMenu } from 'src/order/entities/orderMenu.entity';

describe('OrderApiController (e2e)', () => {
  let app: INestApplication;
  let orderRepository: Repository<Order>;
  let orderMenuRepository: Repository<OrderMenu>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    orderRepository = module.get(getRepositoryToken(Order));
    orderMenuRepository = module.get(getRepositoryToken(OrderMenu));

    setNestApp(app); // ClassSerializerInterceptor 적용
    await app.init();
  });

  beforeEach(async () => {
    await orderRepository.query('set foreign_key_checks = 0');
    await orderRepository.clear();
    await orderRepository.query('set foreign_key_checks = 1');

    await orderMenuRepository.query('set foreign_key_checks = 0');
    await orderMenuRepository.clear();
    await orderMenuRepository.query('set foreign_key_checks = 1');
  });

  it('/order (GET)', async () => {
    // when
    const res = await request(app.getHttpServer())
      .get(`/api/v1/order`)
      .set('Cookie', [
        `accessToken=${process.env.TEST_CLIENT_TOKEN}`,
        'httpOnly',
      ]);

    // then
    const data = res.body;

    expect(res.status).toBe(200);
    expect(data.orders).toHaveLength(0);
  });
});
