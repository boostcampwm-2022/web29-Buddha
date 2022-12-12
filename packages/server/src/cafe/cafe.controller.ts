import { JwtGuard } from './../auth/guard/jwt.guard';
import { Cafe } from './entities/cafe.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeMenuResDto } from './dto/CafeMenuRes.dto';
import { MenuDetailResDto } from './dto/MenuDetailRes.dto';
import { CafeResDto } from './dto/CafeRes.dto';
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

  @Get()
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<CafeResDto[]> {
    const cafes = await this.cafeService.findAll();
    return cafes.map((cafe: Cafe) => new CafeResDto(cafe));
  }
}
