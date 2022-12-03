import { ORDER_STATUS } from './../../../src/order/enum/orderStatus.enum';
import { OrderMenu } from './../../../src/order/entities/orderMenu.entity';
import { OrderService } from './../../../src/order/order.service';
import { OrderModule } from 'src/order/order.module';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getMySQLTestTypeOrmModule } from 'src/utils/getMySQLTestTypeOrmModule';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';
import fs from 'fs';
import path from 'path';
import { Cafe } from 'src/cafe/entities/cafe.entity';
import { User } from 'src/user/entities/user.entity';
import { Menu } from 'src/cafe/entities/menu.entity';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

const mockOrder = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/create-order.json')
);
const mockCafe = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/create-cafe.json')
);

describe('Order Service', () => {
  let sut: OrderService;
  let orderRepository: Repository<Order>;
  let menuOptionRepository: Repository<MenuOption>;
  let orderMenuRepository: Repository<OrderMenu>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrderModule, getMySQLTestTypeOrmModule()],
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
      ],
    }).compile();

    sut = module.get<OrderService>(OrderService);
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
    it('주문이 0개 일때', async () => {
      // given
      const userId = 1;
      const repoSpy = jest.spyOn(orderRepository, 'find');

      // when
      const res = await sut.getOrders(userId);

      // then
      expect(repoSpy).toBeCalled();
      expect(res.orders).toHaveLength(0);
    });

    it('주문이 있을때', async () => {
      // given
      const userId = 1;
      const cafeId = 1;
      const order = JSON.parse(mockOrder.toString());

      await sut.create(
        userId,
        CreateOrderDto.of({ menus: order.menus, cafeId: cafeId })
      );

      const repoSpy = jest.spyOn(orderRepository, 'find');

      // when
      const res = await sut.getOrders(userId);

      // then
      expect(repoSpy).toBeCalled();
      expect(res.orders).toHaveLength(1);
    });
  });
});
