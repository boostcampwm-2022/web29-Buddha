import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, MenuOption])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
