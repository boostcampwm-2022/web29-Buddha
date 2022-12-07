import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class RequestedOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  newOrders: number[];
}
