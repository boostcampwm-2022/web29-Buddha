import { MenuOption } from './../entities/menuOption.entity';
import { OptionResDto } from './OptionRes.dto';
import { Exclude, Expose } from 'class-transformer';

export class MenuDetailResDto {
  @Exclude() readonly _id: number;
  @Exclude() readonly _name: string;
  @Exclude() readonly _description: string;
  @Exclude() readonly _price: number;
  @Exclude() readonly _thumbnail: string;
  @Exclude() readonly _options;

  constructor(menu) {
    this._id = menu.id;
    this._name = menu.name;
    this._description = menu.description;
    this._price = menu.price;
    this._thumbnail = menu.thumbnail;
    this._options = menu.menuOptions.map((menuOption: MenuOption) =>
      OptionResDto.from(menuOption.option)
    );
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get description(): string {
    return this._description;
  }

  @Expose()
  get price(): number {
    return this._price;
  }

  @Expose()
  get thumbnail(): string {
    return this._thumbnail;
  }

  @Expose()
  get options(): number {
    return this._options;
  }
}
