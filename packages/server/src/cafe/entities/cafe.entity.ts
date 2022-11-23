import { Order } from 'src/order/entities/order.entity';
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

  @OneToMany(() => Order, (orders) => orders.cafe)
  orders: Order[];
}
