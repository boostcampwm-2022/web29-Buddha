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
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderMenuDto } from './dto/orderMenu.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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

    // 가능한 option들이 들어왔는지를 검증해야한다.

    // menu별로 매핑된 option을 가져와야한다.
    // menu가격, option 가격을 가져와야한다.

    const menuObjs = menus.map((menu) => {
      const menuObj = new Menu();
      menuObj.id = menu.id;
      return menuObj;
    });
    const menuAndOptionObjs = await this.menuOptionRepository.find({
      where: { menu: menuObjs },
      relations: {
        option: true,
        menu: true,
      },
    });

    const menuAndOptionDict =
      this._getMenuPriceAndItsOptions(menuAndOptionObjs);

    for (const menu of menus) {
      const filteredOptions = this._filterPossibleOptions(
        menu,
        menuAndOptionDict
      );
      if (menu.options.length !== (await filteredOptions).length) {
        throw new BadRequestException(
          '해당 메뉴에서 선택할 수 없는 옵션이 포함되어 있습니다.'
        );
      }
    }

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
      orderMenu.price = this._getTotalPrice(menu, menuAndOptionDict);
      orderMenu.size = menu.size;
      orderMenu.type = menu.type;
      orderMenu.count = menu.count;

      orderMenu.menu = menuObj;
      orderMenu.order = order;

      /* 일단 key value를 모두 인덱스로 했다. */
      const processedOptions = {};
      menu.options.map((option) => {
        processedOptions[option] = option;
      });
      orderMenu.options = JSON.stringify(processedOptions);
      /**/

      return orderMenu;
    });

    order.orderMenus = orderMenus;

    await this.orderRepository.save(order);
    return;
  }

  private _getMenuPriceAndItsOptions(menuOptionObjs: MenuOption[]) {
    const menuOptionDict = {};
    menuOptionObjs.map((menuOptionObj) => {
      const menu = menuOptionObj.menu;
      const option = menuOptionObj.option;
      if (!menuOptionDict.hasOwnProperty(menu.id)) {
        menuOptionDict[menu.id] = {
          menuPrice: menu.price,
          options: {},
        };
      }
      menuOptionDict[menu.id].options[option.id] = option.price;
    });
    return menuOptionDict;
  }

  private async _filterPossibleOptions(menu: OrderMenuDto, menuOptionDict) {
    const { options } = menu;
    const menuId = menu.id;

    const filteredOptions = options.filter((option) =>
      menuOptionDict[menuId].options.hasOwnProperty(option)
    );

    return filteredOptions;
  }

  private _getTotalPrice(menu, menuAndOptionDict) {
    const { options, menuPrice } = menuAndOptionDict[menu.id];
    const totalPriceOfOptions = menu.options.reduce(
      (partialSum, optionId) => partialSum + options[optionId],
      0
    );
    return menuPrice + totalPriceOfOptions;
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
    console.log(order);
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
