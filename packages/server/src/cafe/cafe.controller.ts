import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

@Controller('cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Post()
  create(@Body() createCafeDto: CreateCafeDto) {
    return this.cafeService.create(createCafeDto);
  }

  @Get()
  findAll() {
    return this.cafeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cafeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCafeDto: UpdateCafeDto) {
    return this.cafeService.update(+id, updateCafeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cafeService.remove(+id);
  }
}
