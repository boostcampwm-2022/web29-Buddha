import { TimestampableEntity } from 'src/common/entities/common.entity';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CafeMenu } from './cafeMenu.entity';

@Entity()
export class Cafe extends TimestampableEntity {
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
