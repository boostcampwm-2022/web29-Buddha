import { Injectable } from '@nestjs/common';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

@Injectable()
export class CafeService {
  create(createCafeDto: CreateCafeDto) {
    return 'This action adds a new cafe';
  }

  findAll() {
    return `This action returns all cafe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cafe`;
  }

  update(id: number, updateCafeDto: UpdateCafeDto) {
    return `This action updates a #${id} cafe`;
  }

  remove(id: number) {
    return `This action removes a #${id} cafe`;
  }
}
