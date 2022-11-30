import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cafe } from 'src/cafe/entities/cafe.entity';
import { Menu } from 'src/cafe/entities/menu.entity';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';
import { Option } from 'src/cafe/entities/option.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderMenuDto } from './dto/orderMenu.dto';
import { OrdersResDto } from './dto/ordersRes.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderReqDto } from './dto/updateOrderReq.dto';
import { Order } from './entities/order.entity';
import { OrderMenu } from './entities/orderMenu.entity';
import { ORDER_STATUS } from './enum/orderStatus.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(MenuOption)
    private menuOptionRepository: Repository<MenuOption>
  ) {}

  async getOrders(userId) {
    const user = new User();
    user.id = userId;
    const orders = await this.orderRepository.find({
      relations: {
        cafe: true,
        orderMenus: { menu: true },
      },
      where: {
        user: user,
      },
    });

    return orders;
  }

  async create(userId, createOrderDto: CreateOrderDto) {
    const { menus, cafeId } = createOrderDto;

    // menuAndOptionDict를 만들기 위한 과정. 옵션 가격, 이름, 메뉴 가격, 이름을 모두 가져온다.
    const menuEntityObjs: Menu[] = createOrderDto.createMenuEntityObjs();

    const menuOptionEntityObjs: MenuOption[] =
      await this.getMenuOptionEntityObjs(menuEntityObjs);

    const menuAndOptionDict = this.getMenuOptionDict(menuOptionEntityObjs);
    // menuAndOptionDict를 만들기 위한 과정. 옵션 가격, 이름, 메뉴 가격, 이름을 모두 가져온다.

    // 모든 메뉴가 유효한 메뉴였는지 확인하는 과정
    // if (menuEntityObjs.length !== Object.keys(menuAndOptionDict).length) {
    if (
      menuEntityObjs.every((menuEntityObj) => {
        Object.keys(menuAndOptionDict).includes(menuEntityObj.id.toString());
      })
    ) {
      throw new BadRequestException(
        '주문한 메뉴 중에 존재하지 않은 메뉴가 있습니다.'
      );
    }
    // 모든 메뉴가 유효한 메뉴였는지 확인하는 과정

    // 각 메뉴마다 옵션이 모두 유효한 옵션들인지 확인하는 과정
    for (const menu of menus) {
      const filteredOptions = this.filterPossibleOptions(
        menu,
        menuAndOptionDict
      );
      if (menu.options.length !== filteredOptions.length) {
        throw new BadRequestException(
          '해당 메뉴에서 선택할 수 없는 옵션이 포함되어 있습니다.'
        );
      }
    }
    // 각 메뉴마다 옵션이 모두 유효한 옵션들인지 확인하는 과정

    // 가격 비교
    for (const menu of menus) {
      const totalPrice = this.getTotalPrice(menu, menuAndOptionDict);

      if (menu.price !== totalPrice) {
        throw new BadRequestException('요청된 계산 총액이 정확하지 않습니다.');
      }
    }
    // 가격 비교

    // 주문 저장을 위한 과정
    const cafe = new Cafe();
    cafe.id = cafeId;

    const user = new User();
    user.id = userId;

    const order = new Order();
    order.cafe = cafe;
    order.status = ORDER_STATUS.REQUESTED;
    order.user = user;

    const orderMenus = menus.map((menu) => {
      const orderMenu = new OrderMenu();
      const menuObj = new Menu();

      menuObj.id = menu.id;
      orderMenu.count = menu.count;
      orderMenu.price =
        this.getTotalPrice(menu, menuAndOptionDict) * menu.count;
      orderMenu.size = menu.size;
      orderMenu.type = menu.type;

      orderMenu.menu = menuObj;
      orderMenu.order = order;

      /* 일단 key value를 모두 인덱스로 했다. */
      const processedOptions = {};
      menu.options.map((optionId) => {
        processedOptions[optionId] =
          menuAndOptionDict[menu.id].options[optionId].optionName;
      });
      orderMenu.options = JSON.stringify(processedOptions);
      /**/

      return orderMenu;
    });

    console.log('service - orderMenus');
    console.log(orderMenus);
    order.orderMenus = orderMenus;

    console.log('service - order');
    console.log(order);

    // 주문 저장을 위한 과정

    return await this.orderRepository.save(order);
  }

  private async getMenuOptionEntityObjs(menuEntityObjs): Promise<MenuOption[]> {
    const menuOptionEntityObjs = await this.menuOptionRepository.find({
      where: { menu: menuEntityObjs },
      relations: {
        option: true,
        menu: true,
      },
    });
    return menuOptionEntityObjs;
  }

  private getMenuOptionDict(menuOptionEntityObjs: MenuOption[]) {
    const menuOptionDict = {};
    menuOptionEntityObjs.map((menuOptionEntityObj: MenuOption) => {
      const menu: Menu = menuOptionEntityObj.menu;
      const option: Option = menuOptionEntityObj.option;

      if (!Object.prototype.hasOwnProperty.call(menuOptionDict, menu.id)) {
        menuOptionDict[menu.id] = {
          menuPrice: menu.price,
          options: {},
        };
      }
      menuOptionDict[menu.id].options[option.id] = {
        optionPrice: option.price,
        optionName: option.name,
      };
    });
    return menuOptionDict;
  }

  private filterPossibleOptions(menu: OrderMenuDto, menuOptionDict) {
    const { options } = menu;
    const menuId = menu.id;

    const filteredOptions = options.filter((option: number) =>
      Object.prototype.hasOwnProperty.call(
        menuOptionDict[menuId].options,
        option
      )
    );

    return filteredOptions;
  }

  private getTotalPrice(menu, menuAndOptionDict) {
    const { options, menuPrice } = menuAndOptionDict[menu.id];
    const totalPriceOfOptions = menu.options.reduce(
      (partialSum, optionId) => partialSum + options[optionId].optionPrice,
      0
    );
    return menuPrice + totalPriceOfOptions;
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
    this.orderRepository.save(order);
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
    this.orderRepository.save(order);
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
    this.orderRepository.save(order);
  }

  async findOne(userId: number, orderId: number): Promise<ORDER_STATUS> {
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
    return order.status;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
