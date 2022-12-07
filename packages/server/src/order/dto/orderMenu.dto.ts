import { IsEnum, IsNumber, IsString } from 'class-validator';
import { MENU_SIZE } from 'src/cafe/enum/menuSize.enum';
import { MENU_TYPE } from 'src/cafe/enum/menuType.enum';

export class OrderMenuDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber({}, { each: true })
  options: number[];

  @IsEnum(MENU_SIZE) // 이 데코레이터가 있어야 그에 맞게 validator가 validate한다.
  size: MENU_SIZE; // 이 타입은 typescript를 위한 type일 뿐이다.

  @IsEnum(MENU_TYPE)
  type: MENU_TYPE;

  @IsNumber()
  count: number;

  static of({ id, name, price, options, size, type, count }) {
    const orderMenuDto = new OrderMenuDto();
    orderMenuDto.id = id;
    orderMenuDto.name = name;
    orderMenuDto.price = price;
    orderMenuDto.options = options;
    orderMenuDto.size = size;
    orderMenuDto.type = type;
    orderMenuDto.count = count;
    return orderMenuDto;
  }
}
