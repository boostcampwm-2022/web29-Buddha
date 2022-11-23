import { Cafe } from 'src/cafe/entities/cafe.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORDER_STATUS } from '../enum/orderStatus.enum';
import { OrderMenu } from './orderMenu.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cafe, (cafe) => cafe.orders)
  cafe: Cafe;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS,
    default: ORDER_STATUS.REQUESTED,
  })
  status: ORDER_STATUS;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order, {
    cascade: ['insert'],
  })
  orderMenus: OrderMenu[];
}
