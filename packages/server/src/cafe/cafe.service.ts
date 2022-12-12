import { CafeMenu } from './entities/cafeMenu.entity';
import { Menu } from './entities/menu.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafe } from './entities/cafe.entity';
import { CafeMenuResDto } from './dto/CafeMenuRes.dto';
import { MenuDetailResDto } from './dto/MenuDetailRes.dto';

@Injectable()
export class CafeService {
  constructor(
    @InjectRepository(Cafe) private cafeRepository: Repository<Cafe>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>
  ) {}

  async findAllMenuById(cafeId: number): Promise<CafeMenuResDto> {
    const cafe = await this.cafeRepository.findOne({
      where: {
        id: cafeId,
      },
      relations: {
        cafeMenus: {
          menu: true,
        },
      },
    });

    if (cafe === null) throw new BadRequestException('cafeId not exist');
    return new CafeMenuResDto(cafe);
  }

  async findOneMenuDetail(menuId: number): Promise<MenuDetailResDto> {
    const menu = await this.menuRepository.findOne({
      where: {
        id: menuId,
      },
      relations: {
        menuOptions: {
          option: true,
        },
      },
    });

    if (menu === null) throw new BadRequestException('menuId not exist');
    return new MenuDetailResDto(menu);
  }

  async findAll(): Promise<Cafe[]> {
    const cafes = await this.cafeRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
      },
    });

    return cafes;
  }
}
