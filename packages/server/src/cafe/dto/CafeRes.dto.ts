import { Exclude, Expose } from 'class-transformer';
import { Cafe } from './../entities/cafe.entity';

export class CafeResDto {
  @Exclude() private readonly _id: number;
  @Exclude() readonly _name: string;
  @Exclude() readonly _description: string;
  @Exclude() readonly _address: string;

  constructor(cafe: Cafe) {
    this._id = cafe.id;
    this._name = cafe.name;
    this._description = cafe.description;
    this._address = cafe.address;
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
  get address(): string {
    return this._address;
  }
}
