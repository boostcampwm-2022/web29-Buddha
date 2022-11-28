import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  ValidationPipe,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersResDto } from './dto/ordersRes.dto';
import { ORDER_STATUS } from './enum/orderStatus.enum';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getOrders(@Req() req: Request): Promise<OrdersResDto> {
    const user = req.user as JwtPayload;
    const { id } = user;
    const orders = await this.orderService.getOrders(id);
    return new OrdersResDto(orders);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getOrderStatus(@Req() req: Request, @Param('id') orderId: string) {
    const user = req.user as JwtPayload;
    const userId = user.id;
    const status: ORDER_STATUS = await this.orderService.findOne(
      userId,
      +orderId
    );
    return { order_status: status };
  }

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    })
  )
  @HttpCode(201)
  async createOrder(
    @Req() req: Request,
    @Body() createOrderDto: CreateOrderDto
  ) {
    const user = req.user as JwtPayload;
    const { id } = user;
    await this.orderService.create(id, createOrderDto);
    return;
  }
}
