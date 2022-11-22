import { Cafe } from 'src/cafe/entities/cafe.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderMenu } from './orderMenu.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cafe, (cafe) => cafe.orders)
  cafe: Cafe;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order, {
    cascade: ['insert'],
  })
  orderMenus: OrderMenu[];
}
