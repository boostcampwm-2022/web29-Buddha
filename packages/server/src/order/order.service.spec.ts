import { RedisCacheService } from 'src/redisCache/redisCache.service';
import { OrderMenu } from 'src/order/entities/orderMenu.entity';
import { OrderService } from './order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';
import { mockMenus } from 'src/cafe/mock/menu.entity.mock';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderMenuDto } from './dto/orderMenu.dto';
import {
  getCorrectMenuId,
  getCorrectMenuType,
  getCorrectOptions,
  getCorrectTotalPrice,
  getMockMenuOptions,
} from 'src/cafe/mock/mockDataGenerator';
import { MENU_SIZE } from 'src/cafe/enum/menuSize.enum';
import { ORDER_STATUS } from './enum/orderStatus.enum';
import { mockOptions } from 'src/cafe/mock/option.entity.mock';
import path from 'path';
import fs from 'fs';
import { BadRequestException } from '@nestjs/common';
import { plainToClass, Expose, plainToInstance } from 'class-transformer';

const mockOrder = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/create-order.json')
);
const mockMenuOption = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/menu-option.json')
);

describe('OrderService Unit Test', () => {
  // Repository의 함수들마다 jest.Mock이 할당된 Record에서 key를 부분적으로 가져온 타입 선언
  type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

  let orderService: OrderService;
  let orderRepository: MockRepository<Order>;
  let menuOptionRepository: MockRepository<MenuOption>;
  let orderMenuRepsoitory: MockRepository<OrderMenu>;

  beforeEach(async () => {
    const mockOrderRepository = () => ({
      save: jest.fn(),
    });

    const mockMenuOptionRepository = () => ({
      find: jest.fn(),
      findOne: jest.fn(),
    });

    const mockOrderMenuRepository = () => ({
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository(),
        },
        {
          provide: getRepositoryToken(MenuOption),
          useValue: mockMenuOptionRepository(),
        },
        {
          provide: getRepositoryToken(OrderMenu),
          useValue: mockOrderMenuRepository(),
        },
        {
          provide: DataSource,
          useValue: () => jest.fn(),
        },
        {
          provide: RedisCacheService,
          useValue: () => jest.fn(),
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<MockRepository<Order>>(
      getRepositoryToken(Order)
    );
    menuOptionRepository = module.get<MockRepository<MenuOption>>(
      getRepositoryToken(MenuOption)
    );
    orderMenuRepsoitory = module.get<MockRepository<OrderMenu>>(
      getRepositoryToken(OrderMenu)
    );
  });

  /**
   * 도대체 뭘 테스트해야할까?
   * - 원하는 함수에 파라미터가 잘 들어갔는지?
   * - 정상적으로 데이터가 변환되서 사용자에게 전달 되는지
   * - 파라미터 같은게 누락된게 있을 때, 올바르지 않은 값이 들어왔을 때 정상적으로 처리하는지, 예측할 수 있는 오류들에 대한 검증
   */

  describe('create 테스트', () => {
    it('등록된 메뉴 1개와 유효한 옵션을 주문하고, 올바르게 가격을 제시한 경우', async () => {
      // given
      const spyFn = jest.spyOn(orderRepository, 'save');

      const correctMenuId = getCorrectMenuId();
      const correctOptions = getCorrectOptions(correctMenuId);
      const menuSize = MENU_SIZE.GRANDE;

      const correctPriceWithValidMenuAndOptionOnly = getCorrectTotalPrice(
        correctMenuId,
        correctOptions,
        menuSize
      );
      const mockMenuOptions = getMockMenuOptions([correctMenuId]);
      const correctMenuType = getCorrectMenuType(correctMenuId);
      const menuCount = 1;

      const userId = 1;
      const cafeId = 1;

      const orderMenuDto = new OrderMenuDto();

      orderMenuDto.id = correctMenuId;
      orderMenuDto.name = mockMenus[correctMenuId].name;
      orderMenuDto.options = correctOptions;
      orderMenuDto.price = correctPriceWithValidMenuAndOptionOnly;
      orderMenuDto.size = menuSize;
      orderMenuDto.type = correctMenuType;
      orderMenuDto.count = menuCount;

      const createOrderDto = new CreateOrderDto();
      createOrderDto.cafeId = cafeId;
      createOrderDto.menus = [orderMenuDto];

      menuOptionRepository.find.mockResolvedValue(mockMenuOptions);

      // when
      await orderService.create(userId, createOrderDto);

      // then
      const orderObj = spyFn.mock.calls[0][0];
      const orderMenus = orderObj.orderMenus;
      const correctOptionObj = {};
      correctOptions.map(
        (optionId) => (correctOptionObj[optionId] = mockOptions[optionId].name)
      );

      expect(orderObj.status).toBe(ORDER_STATUS.REQUESTED);
      expect(orderObj.user.id).toBe(userId);
      expect(orderMenus[0].price).toBe(
        correctPriceWithValidMenuAndOptionOnly * menuCount
      );
      expect(orderMenus[0].size).toBe(menuSize);
      expect(orderMenus[0].type).toBe(correctMenuType);
      expect(Object.keys(JSON.parse(orderMenus[0].options)).length).toBe(
        correctOptions.length
      );
      expect(JSON.parse(orderMenus[0].options)).toMatchObject(correctOptionObj);
    });

    it('등록된 메뉴 2개와 유효한 옵션을 주문하고, 올바르게 가격을 제시한 경우', async () => {
      // given
      const spyFn = jest.spyOn(orderRepository, 'save');

      // MENU 1
      const correctMenuId1 = getCorrectMenuId();
      const correctOptions1 = getCorrectOptions(correctMenuId1);
      const menuSize1 = MENU_SIZE.GRANDE;
      const correctPriceWithValidMenuAndOptionOnly1 = getCorrectTotalPrice(
        correctMenuId1,
        correctOptions1,
        menuSize1
      );
      const correctMenuType1 = getCorrectMenuType(correctMenuId1);
      const menuCount1 = 1;

      // MENU 2
      const correctMenuId2 = getCorrectMenuId();
      const correctOptions2 = getCorrectOptions(correctMenuId2);
      const menuSize2 = MENU_SIZE.TALL;
      const correctPriceWithValidMenuAndOptionOnly2 = getCorrectTotalPrice(
        correctMenuId2,
        correctOptions2,
        menuSize2
      );
      const correctMenuType2 = getCorrectMenuType(correctMenuId2);
      const menuCount2 = 3;

      // MOCK MENU OPTIONS
      const mockMenuOptions = getMockMenuOptions([
        correctMenuId1,
        correctMenuId2,
      ]);

      const userId = 1;
      const cafeId = 1;

      const orderMenuDto1 = new OrderMenuDto();
      const orderMenuDto2 = new OrderMenuDto();

      orderMenuDto1.id = correctMenuId1;
      orderMenuDto1.name = mockMenus[correctMenuId1].name;
      orderMenuDto1.options = correctOptions1;
      orderMenuDto1.price = correctPriceWithValidMenuAndOptionOnly1;
      orderMenuDto1.size = menuSize1;
      orderMenuDto1.type = correctMenuType1;
      orderMenuDto1.count = menuCount1;

      orderMenuDto2.id = correctMenuId2;
      orderMenuDto2.name = mockMenus[correctMenuId2].name;
      orderMenuDto2.options = correctOptions2;
      orderMenuDto2.price = correctPriceWithValidMenuAndOptionOnly2;
      orderMenuDto2.size = menuSize2;
      orderMenuDto2.type = correctMenuType2;
      orderMenuDto2.count = menuCount2;

      const createOrderDto = new CreateOrderDto();
      createOrderDto.cafeId = cafeId;
      createOrderDto.menus = [orderMenuDto1, orderMenuDto2];

      menuOptionRepository.find.mockResolvedValue(mockMenuOptions);

      // when
      await orderService.create(userId, createOrderDto);

      // then
      const orderObj = spyFn.mock.calls[0][0];
      const orderMenu1 = orderObj.orderMenus[0];
      const correctOptionObj1 = {};
      correctOptions1.map(
        (optionId) => (correctOptionObj1[optionId] = mockOptions[optionId].name)
      );

      const orderMenu2 = orderObj.orderMenus[1];
      const correctOptionObj2 = {};
      correctOptions2.map(
        (optionId) => (correctOptionObj2[optionId] = mockOptions[optionId].name)
      );

      expect(orderObj.status).toBe(ORDER_STATUS.REQUESTED);
      expect(orderObj.user.id).toBe(userId);

      expect(orderMenu1.price).toBe(
        correctPriceWithValidMenuAndOptionOnly1 * menuCount1
      );
      expect(orderMenu1.size).toBe(menuSize1);
      expect(orderMenu1.type).toBe(correctMenuType1);
      expect(Object.keys(JSON.parse(orderMenu1.options)).length).toBe(
        correctOptions1.length
      );
      expect(JSON.parse(orderMenu1.options)).toMatchObject(correctOptionObj1);

      expect(orderMenu2.price).toBe(
        correctPriceWithValidMenuAndOptionOnly2 * menuCount2
      );
      expect(orderMenu2.size).toBe(menuSize2);
      expect(orderMenu2.type).toBe(correctMenuType2);
      expect(Object.keys(JSON.parse(orderMenu2.options)).length).toBe(
        correctOptions2.length
      );
      expect(JSON.parse(orderMenu2.options)).toMatchObject(correctOptionObj2);
    });

    it('[ERROR] - 주문한 메뉴 중에 유효하지 않은 메뉴가 있는 경우', async () => {
      //given
      const userId = 1;
      const order = JSON.parse(mockOrder.toString());

      const createOrderDto = CreateOrderDto.of({
        menus: order.menus,
        cafeId: order.cafeId,
      });

      menuOptionRepository.find.mockResolvedValue(null);
      //when
      //then
      await expect(
        async () => await orderService.create(userId, createOrderDto)
      ).rejects.toThrowError(
        new BadRequestException(
          '주문한 메뉴 중에 유효하지 않은 메뉴가 있습니다.'
        )
      );
    });
  });
});
