import { ArrayMinSize, IsArray } from 'class-validator';

export class RequestedOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  newOrders: number[];
}
