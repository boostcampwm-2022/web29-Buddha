import { TimestampableEntity } from 'src/common/entities/common.entity';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { USER_TYPE } from '../enum/userType.enum';

@Entity()
export class User extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column({
    type: 'enum',
    enum: USER_TYPE,
    default: USER_TYPE.CLIENT,
  })
  role: USER_TYPE;

  @Column({ nullable: true })
  corporate: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  static createClient({ name, email, nickname, userType }) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.nickname = nickname;
    user.role = userType;
    user.corporate = null;
    return user;
  }

  static createManager({ name, email, nickname, userType, corporate }) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.nickname = nickname;
    user.role = userType;
    user.corporate = corporate;
    return user;
  }
}
