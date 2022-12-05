import 'reflect-metadata';
import { CreateOrderDto } from './dto/create-order.dto';
import path from 'path';
import fs from 'fs';
import { Order } from './entities/order.entity';
import { ORDER_STATUS } from './enum/orderStatus.enum';

const mockOrder = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/create-order.json')
);
const mockMenuOption = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/menu-option.json')
);
const mockMenuOptionDict = fs.readFileSync(
  path.join(process.env.PWD, '/test/mock/menu-option-dict.json')
);

describe('Order Entity Unit Test', () => {
  it('[SUCCESS] isValidMenu() 해당 카페에서 유효한 메뉴인지 확인', async () => {
    // given
    const userId = 1;
    const order = JSON.parse(mockOrder.toString());

    // 유효하지 않은 메뉴 ID
    const validMenuAndOptionInfo = JSON.parse(mockMenuOptionDict.toString());

    // when
    const res = Order.isValidMenu(validMenuAndOptionInfo, order.menus);

    // then
    expect(res).toBe(true);
  });
  it('[ERROR] isValidMenu() 해당 카페에서 유효한 메뉴인지 확인', async () => {
    // given
    const userId = 1;
    const order = JSON.parse(mockOrder.toString());

    // 유효하지 않은 메뉴 ID
    order.menus[0].id = -1000;
    const validMenuAndOptionInfo = JSON.parse(mockMenuOptionDict.toString());

    // when
    const res = Order.isValidMenu(validMenuAndOptionInfo, order.menus);

    // then
    expect(res).toBe(false);
  });
  it('[SUCCESS] isValidOptionForMenu() 해당 메뉴에서 선택할 수 없는 옵션이 포함', async () => {
    // given
    const userId = 1;
    const order = JSON.parse(mockOrder.toString());

    const createOrderDto = CreateOrderDto.of({
      menus: order.menus,
      cafeId: order.cafeId,
    });

    // 유효하지 않은 옵션 ID
    const validMenuAndOptionInfo = JSON.parse(mockMenuOptionDict.toString());

    // when
    const res = Order.isValidOptionForMenu(order.menus, validMenuAndOptionInfo);

    // then
    expect(res).toBe(true);
  });
  it('[ERROR] isValidOptionForMenu() 해당 메뉴에서 선택할 수 없는 옵션이 포함', async () => {
    // given
    const userId = 1;
    const order = JSON.parse(mockOrder.toString());

    const createOrderDto = CreateOrderDto.of({
      menus: order.menus,
      cafeId: order.cafeId,
    });

    // 유효하지 않은 옵션 ID
    createOrderDto.menus[0].options.push(500000);
    const validMenuAndOptionInfo = JSON.parse(mockMenuOptionDict.toString());

    // when
    const res = Order.isValidOptionForMenu(order.menus, validMenuAndOptionInfo);

    // then
    expect(res).toBe(false);
  });
  it('[SUCCESS] isValidOrderTotalPrice() 요청된 계산 총액이 올바름', async () => {
    // given
    const userId = 1;
    const order = JSON.parse(mockOrder.toString());
    const validMenuAndOptionInfo = JSON.parse(mockMenuOptionDict.toString());

    // when
    const res = Order.isValidOrderTotalPrice(
      order.menus,
      validMenuAndOptionInfo
    );

    // then
    expect(res).toBe(true);
  });
  it('[ERROR] isValidOrderTotalPrice() 요청된 계산 총액이 틀림', async () => {
    // given
    const userId = 1;
    const order = JSON.parse(mockOrder.toString());

    // 유효하지 않은 메뉴 가격
    order.menus[0].price = 1000000;
    const validMenuAndOptionInfo = JSON.parse(mockMenuOptionDict.toString());

    // when
    const res = Order.isValidOrderTotalPrice(
      order.menus,
      validMenuAndOptionInfo
    );

    // then
    expect(res).toBe(false);
  });
  it('[SUCCESS] getTotalPrice() ', async () => {
    // given
    const userId = 1;
    const order = JSON.parse(mockOrder.toString());

    const orderMenu = order.menus[1];

    const validMenuAndOptionInfo = JSON.parse(mockMenuOptionDict.toString());

    // when
    const totalPrice = Order.getTotalPrice(orderMenu, validMenuAndOptionInfo);

    // then
    expect(orderMenu.price).toBe(totalPrice);
  });
  it('of() static func', async () => {
    const userId = 1;
    const cafeId = 1;
    const order = JSON.parse(mockOrder.toString());

    const firstOrderMenu = order.menus[0];
    const validMenuAndOptionInfo = JSON.parse(mockMenuOptionDict.toString());

    const orderEntity = Order.of({
      cafeId,
      userId,
      status: ORDER_STATUS.REQUESTED,
      menus: order.menus,
      validMenuAndOptionInfo,
    });

    expect(orderEntity.cafe.id).toBe(cafeId);
    expect(orderEntity.status).toBe(ORDER_STATUS.REQUESTED);
    expect(orderEntity.user.id).toBe(userId);

    expect(orderEntity.orderMenus[0].price).toBe(
      firstOrderMenu.price * firstOrderMenu.count
    );
  });
});
