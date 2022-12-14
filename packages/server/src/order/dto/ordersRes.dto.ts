import { DateTimeUtil } from './../../utils/dateTime.util';
import { Exclude, Expose } from 'class-transformer';
import { Cafe } from 'src/cafe/entities/cafe.entity';
import { Order } from '../entities/order.entity';
import { OrderMenu } from '../entities/orderMenu.entity';
import { ORDER_STATUS } from '../enum/orderStatus.enum';

export class OrdersResDto {
  @Exclude() private readonly _orders: Order[];

  constructor(orders: Order[]) {
    this._orders = orders;
  }

  @Expose()
  get orders(): OrdersOrderDto[] {
    const orders = this._orders.map((order) => {
      return OrdersOrderDto.from(order);
    });
    return orders;
  }
}

export class OrdersOrderDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _status: ORDER_STATUS;
  @Exclude() private readonly _date: Date;
  @Exclude() private readonly _cafe: Cafe;
  @Exclude() private readonly _orderMenus: OrderMenu[];

  constructor(order: Order) {
    this._id = order.id;
    this._status = order.status;
    this._date = order.created_at;
    this._cafe = order.cafe;
    this._orderMenus = order.orderMenus;
  }

  static from(order: Order) {
    return new OrdersOrderDto(order);
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get status(): ORDER_STATUS {
    return this._status;
  }

  @Expose()
  get date(): string {
    return DateTimeUtil.toString(this._date);
  }

  @Expose()
  get cafeId(): number {
    return this._cafe.id;
  }

  @Expose()
  get menus(): any[] {
    const menus = this._orderMenus.map((orderMenu) => {
      return {
        id: orderMenu.menu.id,
        name: orderMenu.menu.name,
        price: orderMenu.price,
        options: JSON.parse(orderMenu.options),
        count: orderMenu.count,
        size: orderMenu.size,
        type: orderMenu.type,
      };
    });
    return menus;
  }
}
