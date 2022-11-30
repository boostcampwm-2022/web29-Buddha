import { TimestampableEntity } from 'src/common/entities/common.entity';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { USER_ROLE } from '../enum/userRole.enum';

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
    enum: USER_ROLE,
    default: USER_ROLE.CLIENT,
  })
  role: USER_ROLE;

  @Column({ nullable: true })
  corporate: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  static createClient({ name, email, nickname, userRole }) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.nickname = nickname;
    user.role = userRole;
    user.corporate = null;
    return user;
  }

  static createManager({ name, email, nickname, userRole, corporate }) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.nickname = nickname;
    user.role = userRole;
    user.corporate = corporate;
    return user;
  }
}
