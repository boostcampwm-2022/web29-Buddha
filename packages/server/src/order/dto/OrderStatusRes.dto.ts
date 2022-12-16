import { ORDER_STATUS } from './../enum/orderStatus.enum';
import { Exclude, Expose } from 'class-transformer';

export class OrderStatusResDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _orderStatus: ORDER_STATUS;

  constructor(orderId: number, status: ORDER_STATUS) {
    this._id = orderId;
    this._orderStatus = status;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get orderStatus(): ORDER_STATUS {
    return this._orderStatus;
  }
}
