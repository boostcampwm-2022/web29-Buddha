import { Exclude, Expose } from 'class-transformer';
import { Cafe } from 'src/cafe/entities/cafe.entity';
import { Order } from '../entities/order.entity';
import { OrderMenu } from '../entities/orderMenu.entity';
import { ORDER_STATUS } from '../enum/orderStatus.enum';

export class OrderResDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _status: ORDER_STATUS;
  @Exclude() private readonly _cafe: Cafe;
  @Exclude() private readonly _menus: OrderMenu[];

  constructor(order: Order) {
    this._id = order.id;
    this._status = order.status;
    this._cafe = order.cafe;
    this._menus = order.orderMenus;
  }

  @Expose()
  get id(): number {
    return this._id;
  }
}
