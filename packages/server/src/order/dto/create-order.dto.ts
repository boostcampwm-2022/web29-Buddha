import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Menu } from 'src/cafe/entities/menu.entity';
import { OrderMenuDto } from './orderMenu.dto';
export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => OrderMenuDto)
  menus: OrderMenuDto[];

  @IsNumber()
  cafeId: number;

  createMenuEntityObjs(): Menu[] {
    return this.menus.map((menu) => {
      const menuObj = new Menu();
      menuObj.id = menu.id;
      return menuObj;
    });
  }
}
