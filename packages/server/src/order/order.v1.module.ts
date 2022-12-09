import { OrderMenu } from './entities/orderMenu.entity';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.v1.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuOption } from 'src/cafe/entities/menuOption.entity';
import { RedisCacheModule } from 'src/redisCache/redisCache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, MenuOption, OrderMenu]),
    RedisCacheModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModuleV1 {}
