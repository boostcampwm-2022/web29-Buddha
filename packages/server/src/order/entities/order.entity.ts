import { Cafe } from 'src/cafe/entities/cafe.entity';
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

  static of({ cafe, status }): Order {
    const order = new Order();
    order.cafe = cafe;
    order.status = status;

    return order;
  }

  static isValidMenu(validMenuAndOptionInfo, menus): boolean {
    return menus.every((menu) => {
      Object.keys(validMenuAndOptionInfo).includes(menu.id.toString());
    });
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
}
