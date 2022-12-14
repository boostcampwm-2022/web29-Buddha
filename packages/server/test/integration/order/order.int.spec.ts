import { ORDER_STATUS } from './../../../src/order/enum/orderStatus.enum';
import { OrderModuleV1 } from 'src/order/order.v1.module';
import { BadRequestException } from '@nestjs/common';
import { OrderMenu } from './../../../src/order/entities/orderMenu.entity';
import { OrderService } from './../../../src/order/order.service';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getMySQLTestTypeOrmModule } from 'src/utils/getMySQLTestTypeOrmModule';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';
import fs from 'fs';
import path from 'path';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { RedisCacheService } from 'src/redisCache/redisCache.service';

const mockOrder = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/create-order.json')
);
const mockCafe = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/create-cafe.json')
);

describe('Order Service', () => {
  let service: OrderService;
  let orderRepository: Repository<Order>;
  let menuOptionRepository: Repository<MenuOption>;
  let orderMenuRepository: Repository<OrderMenu>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrderModuleV1, getMySQLTestTypeOrmModule()],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MenuOption),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(OrderMenu),
          useClass: Repository,
        },
        RedisCacheService,
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    menuOptionRepository = module.get<Repository<MenuOption>>(
      getRepositoryToken(MenuOption)
    );
    orderMenuRepository = module.get<Repository<OrderMenu>>(
      getRepositoryToken(OrderMenu)
    );
  });

  beforeEach(async () => {
    await orderMenuRepository.query('set foreign_key_checks = 0');
    await orderMenuRepository.clear();
    await orderMenuRepository.query('set foreign_key_checks = 1');
    await orderRepository.query('set foreign_key_checks = 0');
    await orderRepository.clear();
    await orderRepository.query('set foreign_key_checks = 1');
  });

  describe('getOrders()', () => {
    it('????????? 0??? ??????', async () => {
      // given
      const userId = 1;
      const repoSpy = jest.spyOn(orderRepository, 'find');

      // when
      const res = await service.getOrders(userId);

      // then
      expect(repoSpy).toBeCalled();
      expect(res.orders).toHaveLength(0);
    });

    it('????????? ?????????', async () => {
      // given
      const userId = 1;
      const cafeId = 1;
      const order = JSON.parse(mockOrder.toString());

      await service.create(
        userId,
        CreateOrderDto.of({ menus: order.menus, cafeId: cafeId })
      );
      const repoSpy = jest.spyOn(orderRepository, 'find');

      // when
      const res = await service.getOrders(userId);

      // then
      expect(repoSpy).toBeCalled();
      expect(res.orders).toHaveLength(1);

      expect(res.orders[0].status).toBe(ORDER_STATUS.REQUESTED);
      expect(res.orders[0].cafeId).toBe(cafeId);
      expect(res.orders[0].menus).toHaveLength(order.menus.length);
    });
  });
  describe('create() - ?????? ??????', () => {
    it('?????? ?????? ??????', async () => {
      // given
      const userId = 1;
      const cafeId = 1;
      const order = JSON.parse(mockOrder.toString());
      const repoSpy = jest.spyOn(orderRepository, 'save');

      // when
      const res = await service.create(
        userId,
        CreateOrderDto.of({ menus: order.menus, cafeId: cafeId })
      );

      // then
      expect(repoSpy).toBeCalled();
      expect(res.orderMenus).toHaveLength(order.menus.length);
      expect(res.status).toBe(ORDER_STATUS.REQUESTED);
      expect(res.cafe.id).toBe(cafeId);
      expect(res.user.id).toBe(userId);
      expect(res.orderMenus).toHaveLength(order.menus.length);
    });

    it('?????? ?????? ?????? - ?????? ??????', async () => {
      // given
      const userId = 1;
      const cafeId = 1;
      const order = JSON.parse(mockOrder.toString());
      order.menus[0].price = -10000;

      // when
      // then
      await expect(
        async () =>
          await service.create(
            userId,
            CreateOrderDto.of({ menus: order.menus, cafeId: cafeId })
          )
      ).rejects.toThrowError(
        new BadRequestException('????????? ?????? ????????? ???????????? ????????????.')
      );
    });
  });
});
