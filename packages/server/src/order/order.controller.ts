import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Get()
  getOrders(@Req() req: Request) {
    const user = req.user as JwtPayload;
    const { id } = user;
    return this.orderService.getOrders(id);
  }

  @Get(':id')
  getOrderStatus(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Post()
  createOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }
}
