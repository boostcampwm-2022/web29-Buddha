import { Exclude, Expose } from 'class-transformer';
import { Order } from '../entities/order.entity';
import { ORDER_STATUS } from '../enum/orderStatus.enum';

export class UpdateOrderReqDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _newStatus: ORDER_STATUS;

  constructor(order: Order) {
    this._id = order.id;
    this._newStatus = order.status;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get newStatus(): ORDER_STATUS {
    return this._newStatus;
  }
}
