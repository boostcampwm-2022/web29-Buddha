import { Exclude, Expose } from 'class-transformer';

export class MenuDto {
  @Exclude() readonly _id: number;
  @Exclude() readonly _name: string;
  @Exclude() readonly _thumbnail: string;
  @Exclude() readonly _price: number;

  constructor(menu) {
    this._id = menu.id;
    this._name = menu.name;
    this._thumbnail = menu.thumbnail;
    this._price = menu.price;
  }

  static from(menu: any) {
    return new MenuDto(menu);
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
  get thumbnail(): string {
    return this._thumbnail;
  }

  @Expose()
  get price(): number {
    return this._price;
  }
}
