import { RequestedOrderDto } from './dto/requested-order.dto';
import { RedisCacheService } from 'src/redisCache/redisCache.service';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cafe } from 'src/cafe/entities/cafe.entity';
import { Menu } from 'src/cafe/entities/menu.entity';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, In, Repository } from 'typeorm';
import { OrdersResDto } from './dto/ordersRes.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderReqDto } from './dto/updateOrderReq.dto';
import { Order } from './entities/order.entity';
import { OrderMenu } from './entities/orderMenu.entity';
import { ORDER_STATUS } from './enum/orderStatus.enum';
import { OrderStatusResDto } from './dto/OrderStatusRes.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(MenuOption)
    private menuOptionRepository: Repository<MenuOption>,
    @InjectRepository(OrderMenu)
    private orderMenuRepository: Repository<OrderMenu>,
    private dataSource: DataSource,
    private redisCacheService: RedisCacheService
  ) {}

  async getOrders(userId): Promise<OrdersResDto> {
    const user = User.byId(userId);

    const orders = await this.orderRepository.find({
      relations: {
        cafe: true,
        orderMenus: { menu: true },
      },
      where: {
        user: user,
      },
    });

    return new OrdersResDto(orders);
  }

  async create(userId, createOrderDto: CreateOrderDto) {
    const { menus, cafeId } = createOrderDto;

    // Menu Entity를 토대로 Menu Option Entity 만들기
    const menuOptionEntityObjs: MenuOption[] = await this.getMenuOptionEntity(
      createOrderDto
    );

    // menuAndOptionDict를 만들기 위한 과정. 옵션 가격, 이름, 메뉴 가격, 이름을 모두 가져온다.
    const validMenuAndOptionInfo =
      Order.getValidMenuAndOptionInfo(menuOptionEntityObjs);

    // 모든 메뉴가 유효한 메뉴였는지 확인하는 과정
    if (!Order.isValidMenu(validMenuAndOptionInfo, menus)) {
      throw new BadRequestException(
        '주문한 메뉴 중에 존재하지 않은 메뉴가 있습니다.'
      );
    }

    // 각 메뉴마다 옵션이 모두 유효한 옵션들인지 확인하는 과정
    if (!Order.isValidOptionForMenu(menus, validMenuAndOptionInfo)) {
      throw new BadRequestException(
        '해당 메뉴에서 선택할 수 없는 옵션이 포함되어 있습니다.'
      );
    }

    // 가격 비교
    if (!Order.isValidOrderTotalPrice(menus, validMenuAndOptionInfo)) {
      throw new BadRequestException('요청된 계산 총액이 정확하지 않습니다.');
    }

    // 주문 저장을 위한 과정
    const order = Order.of({
      cafeId,
      userId,
      status: ORDER_STATUS.REQUESTED,
      menus,
      validMenuAndOptionInfo,
    });

    const res = await this.orderRepository.save(order);
    return res;
  }

  private async getMenuOptionEntity(
    createOrderDto: CreateOrderDto
  ): Promise<MenuOption[]> {
    // 주문 요청으로 들어온 body를 토대로 Menu Entity 만들기
    const menuEntitys: Menu[] = createOrderDto.menus.map((menu) =>
      Menu.byId({ id: menu.id })
    );

    const menuOptionEntitys = await this.menuOptionRepository.find({
      where: { menu: menuEntitys },
      relations: {
        option: true,
        menu: true,
      },
    });

    if (menuOptionEntitys === null)
      throw new BadRequestException(
        '주문한 메뉴 중에 유효하지 않은 메뉴가 있습니다.'
      );
    return menuOptionEntitys;
  }

  async getRequestedOrders(): Promise<OrdersResDto> {
    const cafe = new Cafe();
    cafe.id = 1;

    const orders: Order[] = await this.orderRepository.find({
      relations: {
        cafe: true,
        orderMenus: { menu: true },
      },
      where: {
        status: ORDER_STATUS.REQUESTED,
        cafe: cafe,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return new OrdersResDto(orders);
  }

  async getAcceptedOrders(): Promise<OrdersResDto> {
    const cafe = new Cafe();
    cafe.id = 1;

    const orders: Order[] = await this.orderRepository.find({
      relations: {
        cafe: true,
        orderMenus: { menu: true },
      },
      where: {
        status: ORDER_STATUS.ACCEPTED,
        cafe: cafe,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return new OrdersResDto(orders);
  }

  async getCompletedOrders(): Promise<OrdersResDto> {
    const cafe = new Cafe();
    cafe.id = 1;

    const orders: Order[] = await this.orderRepository.find({
      relations: {
        cafe: true,
        orderMenus: { menu: true },
      },
      where: {
        status: ORDER_STATUS.COMPLETED,
        cafe: cafe,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return new OrdersResDto(orders);
  }

  async updateOrderStatusToAccepted(
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: {
        id: updateOrderReqDto.id,
      },
    });

    if (order.status !== ORDER_STATUS.REQUESTED) {
      throw new BadRequestException(
        '요청 상태가 아닌 주문을 수락할 수 없습니다.'
      );
    }

    order.status = updateOrderReqDto.newStatus;
    await this.orderRepository.save(order);
  }

  async updateOrderStatusToRejected(
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: {
        id: updateOrderReqDto.id,
      },
    });

    if (order.status !== ORDER_STATUS.REQUESTED) {
      throw new BadRequestException(
        '요청 상태가 아닌 주문을 거절할 수 없습니다.'
      );
    }

    order.status = updateOrderReqDto.newStatus;
    await this.orderRepository.save(order);
  }

  async updateOrderStatusToCompleted(
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: {
        id: updateOrderReqDto.id,
      },
    });

    if (order.status !== ORDER_STATUS.ACCEPTED) {
      throw new BadRequestException(
        '수락 상태가 아닌 주문을 완료할 수 없습니다.'
      );
    }

    order.status = updateOrderReqDto.newStatus;
    await this.orderRepository.save(order);
  }

  async getOrderStatus(userId: number, orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        user: true,
        orderMenus: { menu: true },
      },
    });
    if (order === null) {
      throw new BadRequestException('해당 주문을 찾을 수 없습니다.');
    }
    if (order.user.id !== userId) {
      throw new UnauthorizedException(
        '해당 주문의 상태 조회에 대한 접근 권한이 없습니다.'
      );
    }
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async createV2(userId, createOrderDto: CreateOrderDto) {
    const { menus, cafeId } = createOrderDto;

    // Menu Entity를 토대로 Menu Option Entity 만들기
    const menuOptionEntityObjs: MenuOption[] = await this.getMenuOptionEntity(
      createOrderDto
    );

    // menuAndOptionDict를 만들기 위한 과정. 옵션 가격, 이름, 메뉴 가격, 이름을 모두 가져온다.
    const validMenuAndOptionInfo =
      Order.getValidMenuAndOptionInfo(menuOptionEntityObjs);

    // 모든 메뉴가 유효한 메뉴였는지 확인하는 과정
    if (!Order.isValidMenu(validMenuAndOptionInfo, menus)) {
      throw new BadRequestException(
        '주문한 메뉴 중에 존재하지 않은 메뉴가 있습니다.'
      );
    }

    // 각 메뉴마다 옵션이 모두 유효한 옵션들인지 확인하는 과정
    if (!Order.isValidOptionForMenu(menus, validMenuAndOptionInfo)) {
      throw new BadRequestException(
        '해당 메뉴에서 선택할 수 없는 옵션이 포함되어 있습니다.'
      );
    }

    // 가격 비교
    if (!Order.isValidOrderTotalPrice(menus, validMenuAndOptionInfo)) {
      throw new BadRequestException('요청된 계산 총액이 정확하지 않습니다.');
    }

    // 주문 저장을 위한 과정

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderEntity = Order.of({
        cafeId,
        userId,
        status: ORDER_STATUS.REQUESTED,
        menus,
        validMenuAndOptionInfo,
      });

      const newOrder = await queryRunner.manager.save(orderEntity);
      await this.redisCacheService.insertCachedOrder(
        cafeId.toString(),
        newOrder.id.toString(),
        ORDER_STATUS.REQUESTED
      );

      await await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('서버에 이상이 있습니다');
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async getOrderStatusV2(
    userId: number,
    orderId: number,
    cafeId: number
  ): Promise<ORDER_STATUS> {
    // cache 조회
    const cachedOrder = await this.redisCacheService.getCachedOrder(
      cafeId.toString(),
      orderId.toString()
    );

    if (cachedOrder) {
      return cachedOrder;
    }

    // db 조회 -> cache 업데이트 -> return status
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        user: true,
      },
    });

    if (order === null) {
      throw new BadRequestException('해당 주문을 찾을 수 없습니다.');
    }

    if (order.user.id !== userId) {
      throw new UnauthorizedException(
        '해당 주문의 상태 조회에 대한 접근 권한이 없습니다.'
      );
    }

    // cache update
    await this.redisCacheService.updateCachedOrder(
      cafeId.toString(),
      order.id.toString(),
      order.status
    );

    return order.status;
  }

  async getRequestedOrdersV2(
    cafeId: number,
    requestedOrderDto: RequestedOrderDto
  ): Promise<OrdersResDto> {
    const orders: Order[] = await this.orderRepository.find({
      relations: {
        cafe: true,
        orderMenus: { menu: true },
      },
      where: {
        status: ORDER_STATUS.REQUESTED,
        cafe: Cafe.byId(cafeId),
        id: In(requestedOrderDto.newOrders),
      },
    });

    return new OrdersResDto(orders);
  }

  async getAcceptedOrdersV2(cafeId: number): Promise<OrdersResDto> {
    const orders: Order[] = await this.orderRepository.find({
      relations: {
        cafe: true,
        orderMenus: { menu: true },
      },
      where: {
        status: ORDER_STATUS.ACCEPTED,
        cafe: Cafe.byId(cafeId),
      },
    });

    return new OrdersResDto(orders);
  }
  async getCachedRequestedOrdersV2(
    cafeId: string,
    pksFromManager: Set<string>
  ) {
    const cachedOrders = await this.redisCacheService.getAllCachedOrders(
      cafeId
    );

    const newOrderPkList = [];
    const deletedOrderPkList = [];
    const pksInCache = new Set(Object.keys(cachedOrders));
    pksInCache.forEach((pk) => {
      if (
        cachedOrders[pk] === ORDER_STATUS.REQUESTED &&
        !pksFromManager.has(pk)
      ) {
        newOrderPkList.push(pk);
      }
    });
    pksFromManager.forEach((pk) => {
      if (cachedOrders[pk] !== ORDER_STATUS.REQUESTED) {
        deletedOrderPkList.push(pk);
      }
    });

    return { newOrderPkList, deletedOrderPkList };
  }

  async updateOrderStatusToAcceptedV2(
    cafeId: string,
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const orderId = updateOrderReqDto.id.toString();
    const targetOrderStatus = ORDER_STATUS.ACCEPTED;

    const orderStatus = await this.redisCacheService.getCachedOrder(
      cafeId,
      orderId
    );

    if (orderStatus !== ORDER_STATUS.REQUESTED) {
      throw new BadRequestException(
        '요청 상태가 아닌 주문을 수락할 수 없습니다.'
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderEntity = Order.ofToUpdateStatus({
        orderId: parseInt(orderId),
        orderStatus: targetOrderStatus,
      });

      await queryRunner.manager.save(orderEntity);
      await this.redisCacheService.updateCachedOrder(
        cafeId,
        orderId,
        targetOrderStatus
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('서버에 이상이 있습니다');
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
    return;
  }

  async updateOrderStatusToRejectedV2(
    cafeId: string,
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const orderId = updateOrderReqDto.id.toString();
    const targetOrderStatus = ORDER_STATUS.REJECTED;

    const orderStatus = await this.redisCacheService.getCachedOrder(
      cafeId,
      orderId
    );

    if (orderStatus !== ORDER_STATUS.REQUESTED) {
      throw new BadRequestException(
        '요청 상태가 아닌 주문을 거절할 수 없습니다.'
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderEntity = Order.ofToUpdateStatus({
        orderId: parseInt(orderId),
        orderStatus: targetOrderStatus,
      });

      await queryRunner.manager.save(orderEntity);
      await this.redisCacheService.updateCachedOrder(
        cafeId,
        orderId,
        targetOrderStatus
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('서버에 이상이 있습니다');
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
    return;
  }

  async updateOrderStatusToCompletedV2(
    cafeId: string,
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const orderId = updateOrderReqDto.id.toString();
    const targetOrderStatus = ORDER_STATUS.COMPLETED;

    const orderStatus = await this.redisCacheService.getCachedOrder(
      cafeId,
      orderId
    );

    if (orderStatus !== ORDER_STATUS.ACCEPTED) {
      throw new BadRequestException(
        '요청 상태가 아닌 주문을 거절할 수 없습니다.'
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderEntity = Order.ofToUpdateStatus({
        orderId: parseInt(orderId),
        orderStatus: targetOrderStatus,
      });

      await queryRunner.manager.save(orderEntity);
      await this.redisCacheService.updateCachedOrder(
        cafeId,
        orderId,
        targetOrderStatus
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('서버에 이상이 있습니다');
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
    return;
  }

  /**
   * 고객 polling
   * 점주 polling
   * 점주 주문 수락
   */

  async getOrderStatusV3(
    cafeId: number,
    orderId: number
  ): Promise<OrderStatusResDto> {
    const cafeKey = 'cafe' + cafeId + 'Client';
    const orderStatus = await this.redisCacheService.getCachedOrderStatusV3(
      cafeKey,
      orderId.toString()
    );
    if (orderStatus) {
      return new OrderStatusResDto(orderId, ORDER_STATUS[orderStatus]);
    }

    // db 조회 -> cache 업데이트 -> return status
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        user: true,
      },
    });

    if (order === null) {
      throw new BadRequestException('해당 주문을 찾을 수 없습니다.');
    }

    // cache update
    if (
      order.status === ORDER_STATUS.REQUESTED ||
      order.status === ORDER_STATUS.ACCEPTED
    ) {
      await this.redisCacheService.insertCachedOrder(
        cafeId.toString(),
        order.id.toString(),
        order.status
      );
    }

    return new OrderStatusResDto(orderId, ORDER_STATUS[order.status]);
  }

  async getNewCachedOrdersV3(cafeId: number, startingOrderId: number) {
    const cafeKey = 'cafe' + cafeId + 'Manager';
    const newCachedOrders = await this.redisCacheService.getNewCachedOrdersV3(
      cafeId,
      startingOrderId + 1
    );

    if (!newCachedOrders) {
      this.orderRepository
        .find({
          where: { cafe: Cafe.byId(cafeId), status: ORDER_STATUS.REQUESTED },
          relations: {
            orderMenus: true,
            cafe: true,
            user: true,
          },
        })
        .then((orders) => {
          orders.map((order) =>
            this.redisCacheService.insertNewOrderV3(
              cafeKey,
              order.id,
              Order.toJson(order)
            )
          );
        });
      throw new HttpException('불러오는 중입니다.', 202);
    }

    return newCachedOrders.map((newCachedOrder) => JSON.parse(newCachedOrder));
  }

  async updateOrderStatusToAcceptedV3(
    cafeId: number,
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const managerCafeKey = 'cafe' + cafeId + 'Manager';
    const clientCafeKey = 'cafe' + cafeId + 'Client';
    const orderId = updateOrderReqDto.id;
    const targetOrderStatus = ORDER_STATUS.ACCEPTED;

    const orderList = await this.redisCacheService.getCachedOrderV3(
      managerCafeKey,
      orderId
    );

    if (!orderList) {
      throw new BadRequestException(
        '요청 상태가 아닌 주문을 수락할 수 없습니다.'
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderEntity = Order.ofToUpdateStatus({
        orderId: orderId,
        orderStatus: targetOrderStatus,
      });

      await queryRunner.manager.save(orderEntity);

      // 이 친구들도 transaction으로..? 이렇게까지해야하나?
      await this.redisCacheService.deleteCachedOrderV3(managerCafeKey, orderId);
      await this.redisCacheService.updateOrderStatusV3(
        clientCafeKey,
        orderId,
        targetOrderStatus
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('서버에 이상이 있습니다');
    } finally {
      await queryRunner.release();
    }
    return;
  }

  async testInsert(id, status) {
    const data = {
      id: id,
      status: status,
    };
    await this.redisCacheService.insertNewOrderV3(
      'cafe1Manager',
      parseInt(id),
      JSON.stringify(data)
    );
    await this.redisCacheService.updateOrderStatusV3(
      'cafe1Client',
      id,
      ORDER_STATUS.REQUESTED
    );
  }
  async createOrderV3(userId, createOrderDto: CreateOrderDto) {
    const { menus, cafeId } = createOrderDto;

    // Menu Entity를 토대로 Menu Option Entity 만들기
    const menuOptionEntityObjs: MenuOption[] = await this.getMenuOptionEntity(
      createOrderDto
    );

    // menuAndOptionDict를 만들기 위한 과정. 옵션 가격, 이름, 메뉴 가격, 이름을 모두 가져온다.
    const validMenuAndOptionInfo =
      Order.getValidMenuAndOptionInfo(menuOptionEntityObjs);

    // 모든 메뉴가 유효한 메뉴였는지 확인하는 과정
    if (!Order.isValidMenu(validMenuAndOptionInfo, menus)) {
      throw new BadRequestException(
        '주문한 메뉴 중에 존재하지 않은 메뉴가 있습니다.'
      );
    }

    // 각 메뉴마다 옵션이 모두 유효한 옵션들인지 확인하는 과정
    if (!Order.isValidOptionForMenu(menus, validMenuAndOptionInfo)) {
      throw new BadRequestException(
        '해당 메뉴에서 선택할 수 없는 옵션이 포함되어 있습니다.'
      );
    }

    // 가격 비교
    if (!Order.isValidOrderTotalPrice(menus, validMenuAndOptionInfo)) {
      throw new BadRequestException('요청된 계산 총액이 정확하지 않습니다.');
    }

    // 주문 저장을 위한 트랜젝션
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderEntity = Order.of({
        cafeId,
        userId,
        status: ORDER_STATUS.REQUESTED,
        menus,
        validMenuAndOptionInfo,
      });

      // db 저장
      const newOrder = await queryRunner.manager.save(orderEntity);

      // redis 저장 : 고객 -> hset, 점주 -> sorted set
      const managerCafeKey = 'cafe' + cafeId + 'Manager';
      const clientCafeKey = 'cafe' + cafeId + 'Client';
      const orderId = newOrder.id;

      // 업주 카페 주문 내역들
      await this.redisCacheService.insertNewOrderV3(
        managerCafeKey,
        orderId,
        Order.toJson(newOrder)
      );
      // 고객 상태
      await this.redisCacheService.updateOrderStatusV3(
        clientCafeKey,
        orderId,
        ORDER_STATUS.REQUESTED
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('서버에 이상이 있습니다');
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
    return;
  }

  async updateOrderStatusToRejectedV3(
    cafeId: number,
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const orderId = updateOrderReqDto.id;
    const targetOrderStatus = ORDER_STATUS.REJECTED;
    const managerCafeKey = 'cafe' + cafeId + 'Manager';
    const clientCafeKey = 'cafe' + cafeId + 'Client';

    const orderStatus = await this.redisCacheService.getCachedOrderStatusV3(
      clientCafeKey,
      orderId.toString()
    );

    if (orderStatus !== ORDER_STATUS.REQUESTED) {
      throw new BadRequestException(
        '요청 상태가 아닌 주문을 거절할 수 없습니다.'
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderEntity = Order.ofToUpdateStatus({
        orderId: orderId,
        orderStatus: targetOrderStatus,
      });

      // db update
      await queryRunner.manager.save(orderEntity);

      // redis update
      // 1. 카페 주문 내역에서 삭제
      // 2. 고객 주문 상태 변경
      // redis update : 고객 -> hset, 점주(카페) -> sorted set

      // 카페 주문 내역에서 삭제
      await this.redisCacheService.deleteCachedOrderV3(managerCafeKey, orderId);

      // 고객 상태
      await this.redisCacheService.deleteOrderStatusV3(
        clientCafeKey,
        orderId.toString()
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      throw new InternalServerErrorException('서버에 이상이 있습니다');
    } finally {
      await queryRunner.release();
    }
    return;
  }

  async updateOrderStatusToCompletedV3(
    cafeId: number,
    updateOrderReqDto: UpdateOrderReqDto
  ): Promise<void> {
    const orderId = updateOrderReqDto.id;
    const targetOrderStatus = ORDER_STATUS.COMPLETED;
    const managerCafeKey = 'cafe' + cafeId + 'Manager';
    const clientCafeKey = 'cafe' + cafeId + 'Client';

    const orderStatus = await this.redisCacheService.getCachedOrderStatusV3(
      clientCafeKey,
      orderId.toString()
    );

    if (orderStatus !== ORDER_STATUS.ACCEPTED) {
      throw new BadRequestException(
        '수락 상태가 아닌 주문을 완료할 수 없습니다.'
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 주문 완료
      // 1. db update status to complted
      // 2. redis delete 고객 주문 상태 key

      // db update
      const orderEntity = Order.ofToUpdateStatus({
        orderId: orderId,
        orderStatus: targetOrderStatus,
      });

      await queryRunner.manager.save(orderEntity);

      // redis delete
      await this.redisCacheService.deleteOrderStatusV3(
        clientCafeKey,
        orderId.toString()
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('서버에 이상이 있습니다');
    } finally {
      await queryRunner.release();
    }
    return;
  }
}
