import { Menu } from 'src/cafe/entities/menu.entity';
import { MENU_SIZE } from 'src/cafe/enum/menuSize.enum';
import { MENU_TYPE } from 'src/cafe/enum/menuType.enum';
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

  @Column({
    type: 'enum',
    enum: MENU_SIZE,
    default: MENU_SIZE.TALL,
  })
  size: MENU_SIZE;

  @Column({
    type: 'enum',
    enum: MENU_TYPE,
    default: MENU_TYPE.ICED,
  })
  type: MENU_TYPE;

  @Column()
  number: number;

  // total price
  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.orderMenus)
  order: Order;

  @ManyToOne(() => Menu, (menu) => menu.orderMenus)
  menu: Menu;
}
