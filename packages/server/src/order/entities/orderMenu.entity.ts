import { Menu } from 'src/cafe/entities/menu.entity';
import { TimestampableEntity } from 'src/common/entities/common.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
@Entity()
export class OrderMenu extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '500' })
  options: string;

  // total price
  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.orderMenus)
  order: Order;

  @ManyToOne(() => Menu, (menu) => menu.orderMenus)
  menu: Menu;
}
