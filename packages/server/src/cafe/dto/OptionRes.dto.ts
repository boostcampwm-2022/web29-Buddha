import { Exclude, Expose } from 'class-transformer';

export class OptionResDto {
  @Exclude() readonly _id: number;
  @Exclude() readonly _name: string;
  @Exclude() readonly _price: number;
  @Exclude() readonly _category: string;

  constructor(option) {
    this._id = option.id;
    this._name = option.name;
    this._price = option.price;
    this._category = option.category;
  }

  static from(option: any) {
    return new OptionResDto(option);
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
  get price(): number {
    return this._price;
  }

  @Expose()
  get category(): string {
    return this._category;
  }
}
