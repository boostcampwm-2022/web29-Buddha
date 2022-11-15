import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CafeMenu } from './cafeMenu.entity';

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  address: string;

  @OneToMany(() => CafeMenu, (cafeMenus) => cafeMenus.cafe)
  cafeMenus: CafeMenu[];
}
