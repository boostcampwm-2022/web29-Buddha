import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_STATUS } from './enum/orderStatus.enum';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtGuard)
  async createOrderTest(
    @Req() req: Request,
    @Body() createOrderDto: CreateOrderDto
  ) {
    const user = req.user as JwtPayload;
    const { id } = user;
    await this.orderService.createV2(id, createOrderDto);
    return;
  }

  @Get()
  @UseGuards(JwtGuard)
  async getOrderStatusTest(
    @Req() req: Request,
    @Query('id', ParseIntPipe) orderId: number
  ) {
    const user = req.user as JwtPayload;
    const userId = user.id;
    const cafeId = 1;

    const status: ORDER_STATUS = await this.orderService.getOrderStatusV2(
      userId,
      orderId,
      cafeId
    );
    return { order_status: status };
  }
}
