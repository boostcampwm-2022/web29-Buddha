import { Exclude, Expose } from 'class-transformer';
import { Cafe } from './../entities/cafe.entity';
import { MenuDto } from './MenuRes.dto';

export class CafeMenuResDto {
  @Exclude() private readonly _id: number;
  @Exclude() readonly _cafe_name: string;
  @Exclude() readonly _menus: MenuDto[];

  constructor(cafe: Cafe) {
    this._id = cafe.id;
    this._cafe_name = cafe.name;
    this._menus = cafe.cafeMenus.map((cafeMenu) => MenuDto.from(cafeMenu.menu));
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get cafe_name(): string {
    return this._cafe_name;
  }

  @Expose()
  get menus(): MenuDto[] {
    return this._menus;
  }
}
