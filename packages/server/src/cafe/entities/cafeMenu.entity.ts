import { TimestampableEntity } from 'src/common/entities/common.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cafe } from './cafe.entity';
import { Menu } from './menu.entity';

@Entity()
export class CafeMenu extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cafe, (cafe) => cafe.cafeMenus)
  cafe: Cafe;

  @ManyToOne(() => Menu)
  menu: Menu;
}
