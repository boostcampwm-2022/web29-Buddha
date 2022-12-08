import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';
export class OldRequestedOrdersDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  oldRequestedOrderPks: Array<number>;
}
