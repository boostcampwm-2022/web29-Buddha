import { OrderService } from './order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

describe('OrderService Unit Test', () => {
  // Repository의 함수들마다 jest.Mock이 할당된 Record에서 key를 부분적으로 가져온 타입 선언
  type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

  const mockOrderRepository = () => ({
    save: jest.fn(),
  });

  const mockMenuOptionRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
  });

  let orderService: OrderService;
  let orderRepository: MockRepository<Order>;
  let menuOptionRepository: MockRepository<MenuOption>;

  beforeAll(async () => {
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
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<MockRepository<Order>>(
      getRepositoryToken(Order)
    );
    menuOptionRepository = module.get<MockRepository<MenuOption>>(
      getRepositoryToken(MenuOption)
    );
  });

  /**
   * 도대체 뭘 테스트해야할까?
   * - 원하는 함수에 파라미터가 잘 들어갔는지?
   * - 내가 예상하던 결과가 잘 나왔는지?
   * - 특정 경우들에 대해 원하는 예외가 잘 터졌는지?
   */

  describe('create 테스트', () => {
    it('등록된 메뉴 1개와 유효한 옵션을 주문하고, 올바르게 가격을 제시한 경우', async () => {
      // given
      const spyFn = jest.spyOn(orderRepository, 'save');
      const correctMenuId = getCorrectMenuId();
      const correctOptions = getCorrectOptions(correctMenuId);
      const correctPriceWithValidMenuAndOptionOnly = getCorrectTotalPrice(
        correctMenuId,
        correctOptions
      );
      const mockMenuOptions = getMockMenuOptions([correctMenuId]);
      const correctMenuType = getCorrectMenuType(correctMenuId);
      const menuSize = MENU_SIZE.GRANDE;
      const menuCount = 1;
      menuOptionRepository.find.mockResolvedValue(mockMenuOptions);

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
  });
});
