import { Cafe } from './entities/cafe.entity';
import { Menu } from './entities/menu.entity';
import { Module } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeController } from './cafe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeMenu } from './entities/cafeMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe, Menu])],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
