import { classToPlain, instanceToPlain, serialize } from 'class-transformer';
import { Cafe } from 'src/cafe/entities/cafe.entity';
import { Menu } from 'src/cafe/entities/menu.entity';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';
import { SIZE_PRICE } from 'src/cafe/enum/menuSize.enum';
import { TimestampableEntity } from 'src/common/entities/common.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORDER_STATUS } from '../enum/orderStatus.enum';
import { OrderMenu } from './orderMenu.entity';

@Entity()
export class Order extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cafe, (cafe) => cafe.orders)
  cafe: Cafe;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS,
    default: ORDER_STATUS.REQUESTED,
  })
  status: ORDER_STATUS;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order, {
    cascade: ['insert'],
  })
  orderMenus: OrderMenu[];

  static of({ cafeId, userId, status, menus, validMenuAndOptionInfo }) {
    const cafe = Cafe.byId(cafeId);
    const user = User.byId(userId);

    const order = new Order();
    order.cafe = cafe;
    order.status = ORDER_STATUS.REQUESTED;
    order.user = user;

    const orderMenus = menus.map((menu) => {
      const orderMenu = new OrderMenu();
      const menuObj = new Menu();
      menuObj.id = menu.id;

      const processedOptions = {};
      menu.options.forEach((optionId) => {
        processedOptions[optionId] =
          validMenuAndOptionInfo[menu.id].options[optionId].optionName;
      });

      orderMenu.count = menu.count;
      orderMenu.price =
        Order.getTotalPrice(menu, validMenuAndOptionInfo) * menu.count;
      orderMenu.size = menu.size;
      orderMenu.type = menu.type;
      orderMenu.menu = menuObj;
      orderMenu.order = order;
      orderMenu.options = JSON.stringify(processedOptions);
      return orderMenu;
    });

    order.orderMenus = orderMenus;

    return order;
  }

  static ofToUpdateStatus({ orderId, orderStatus }) {
    const order = new Order();
    order.id = orderId;
    order.status = orderStatus;
    return order;
  }

  static isValidMenu(validMenuAndOptionInfo, menus): boolean {
    return menus.every((menu) =>
      Object.keys(validMenuAndOptionInfo).includes(menu.id.toString())
    );
  }

  static isValidOptionForMenu(menus, menuOptionDict): boolean {
    for (const menu of menus) {
      const { options } = menu;

      const filteredOptions = options.filter((option: number) =>
        Object.prototype.hasOwnProperty.call(
          menuOptionDict[menu.id].options,
          option
        )
      );

      if (menu.options.length !== filteredOptions.length) {
        return false;
      }
    }

    return true;
  }

  static isValidOrderTotalPrice(menus, menuAndOptionDict) {
    for (const menu of menus) {
      const totalPrice = Order.getTotalPrice(menu, menuAndOptionDict);

      if (menu.price !== totalPrice) {
        return false;
      }
    }
    return true;
  }

  static getTotalPrice(menu, menuAndOptionDict): number {
    const { options, menuPrice } = menuAndOptionDict[menu.id];
    const totalPriceOfOptions = menu.options.reduce(
      (partialSum, optionId) => partialSum + options[optionId].optionPrice,
      0
    );
    const sizePrice = parseInt(SIZE_PRICE[menu.size]);
    const totalPrice = menuPrice + totalPriceOfOptions + sizePrice;
    return totalPrice;
  }

  static getValidMenuAndOptionInfo(menuOptionEntityObjs: MenuOption[]) {
    // Menu별로 유효한 옵션을 가진 Dict 생성
    const menuOptionDict = {};

    menuOptionEntityObjs.forEach((menuOptionEntityObj: MenuOption) => {
      const menu: Menu = menuOptionEntityObj.menu;
      const option = menuOptionEntityObj.option;

      // 메뉴 dict에 menu아이디 없으면 menu 가격과 options 추가
      if (!Object.prototype.hasOwnProperty.call(menuOptionDict, menu.id)) {
        menuOptionDict[menu.id] = {
          menuPrice: menu.price,
          options: {},
        };
      }

      // menu 별로 options 배열에 option 넣어주기
      menuOptionDict[menu.id].options[option.id] = {
        optionPrice: option.price,
        optionName: option.name,
      };
    });

    return menuOptionDict;
  }

  // {
  //   newOrder: Order {
  //     cafe: Cafe { id: 1 },
  //     status: 'REQUESTED',
  //     user: User { id: 1 },
  //     orderMenus: [ [OrderMenu], [OrderMenu] ],
  //     deleted_at: null,
  //     created_at: 2022-12-10T01:15:05.021Z,
  //     updated_at: 2022-12-10T01:15:05.021Z,
  //     id: 56
  //   }
  // }
  static toJson(order: Order) {
    const data = {};
    data['id'] = order.id;
    data['cafe'] = order.cafe.id;
    data['status'] = order.status;
    data['user'] = order.user.id;
    data['created_at'] = order.created_at;
    data['updated_at'] = order.updated_at;
    data['orderMenus'] = order.orderMenus.map((orderMenu: OrderMenu) =>
      JSON.stringify(OrderMenu.toJson(orderMenu))
    );
    // 순환 참조 일어나 스택오버플로우 발생됨 order -> orderMenu -> order
    // console.log(JSON.stringify(instanceToPlain(order)));
    return JSON.stringify(data);
  }
}
