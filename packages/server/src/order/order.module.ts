import { OrderMenu } from './entities/orderMenu.entity';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, MenuOption, OrderMenu])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
