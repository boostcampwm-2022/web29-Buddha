import { OrderResDto } from './dto/orderRes.dto';
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

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/requested')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getRequestedOrders(): Promise<OrdersResDto> {
    return await this.orderService.getRequestedOrders();
  }

  @UseGuards(JwtGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getOrders(@Req() req: Request): Promise<OrdersResDto> {
    const user = req.user as JwtPayload;
    const { id } = user;
    const orders = await this.orderService.getOrders(id);
    return new OrdersResDto(orders);
  }

  @Get(':id')
  getOrderStatus(@Param('id') id: string) {
    return this.orderService.findOne(+id);
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
