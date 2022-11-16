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
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeMenuResDto } from './dto/CafeMenuRes.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cafeService.findOne(+id);
  }
}
