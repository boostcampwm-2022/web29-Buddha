import { TimestampableEntity } from 'src/common/entities/common.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';
import { Option } from './option.entity';

@Entity()
export class MenuOption extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Menu, (menu) => menu.menuOptions)
  menu: Menu;

  @ManyToOne(() => Option)
  option: Option;
}
