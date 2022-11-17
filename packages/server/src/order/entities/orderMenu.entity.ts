import { Menu } from 'src/cafe/entities/menu.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
@Entity()
export class OrderMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '500' })
  options: string;

  // total price
  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.orderMenus)
  order: Order;

  @OneToOne(() => Menu)
  menu: Menu;
}
