import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { OrderMenuDto } from './orderMenu.dto';
export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => OrderMenuDto)
  menus: OrderMenuDto[];

  @IsNumber()
  cafeId: number;
}
