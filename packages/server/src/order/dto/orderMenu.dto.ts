import { IsNumber, IsString } from 'class-validator';

export class OrderMenuDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsNumber({}, { each: true })
  options: number[];
}
