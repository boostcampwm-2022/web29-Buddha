import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
