import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cafe } from './cafe.entity';
import { Menu } from './menu.entity';

@Entity()
export class CafeMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cafe, (cafe) => cafe.cafeMenus)
  cafe: Cafe;

  @ManyToOne(() => Menu)
  menu: Menu;
}
