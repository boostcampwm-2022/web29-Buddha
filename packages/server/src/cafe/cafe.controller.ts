import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeMenuResDto } from './dto/CafeMenuRes.dto';
import { MenuDetailResDto } from './dto/MenuDetailRes.dto';
@Controller()
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':cafeId/menus')
  async findAllMenuById(
    @Param('cafeId', ParseIntPipe) cafeId: number
  ): Promise<CafeMenuResDto> {
    return await this.cafeService.findAllMenuById(cafeId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('menu/:menuId')
  async findOneMenuDetail(
    @Param('menuId', ParseIntPipe) menuId: number
  ): Promise<MenuDetailResDto> {
    return this.cafeService.findOneMenuDetail(menuId);
  }
}
