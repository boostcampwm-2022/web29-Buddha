import { TimestampableEntity } from 'src/common/entities/common.entity';
import { OrderMenu } from 'src/order/entities/orderMenu.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MENU_TYPE } from '../enum/menuType.enum';
import { MenuOption } from './menuOption.entity';

@Entity()
export class Menu extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column({ type: 'varchar', length: '2000' })
  thumbnail: string;

  @Column({
    type: 'enum',
    enum: MENU_TYPE,
  })
  type: MENU_TYPE;

  @OneToMany(() => MenuOption, (menuOption) => menuOption.menu)
  menuOptions: MenuOption[];

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.menu)
  orderMenus: OrderMenu[];
}
