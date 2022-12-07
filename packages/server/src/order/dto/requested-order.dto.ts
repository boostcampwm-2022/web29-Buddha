import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class RequestedOrderDto {
  @IsNumber()
  cafeId: number;

  @IsArray()
  @ArrayMinSize(1)
  newOrders: number[];
}
