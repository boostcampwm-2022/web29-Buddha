import { UpdateOrderReqDto } from './dto/updateOrderReq.dto';
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
  ParseIntPipe,
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

  @Get('/requested')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getRequestedOrders(): Promise<OrdersResDto> {
    return await this.orderService.getRequestedOrders();
  }

  @Get('/accepted')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getAcceptedOrders(): Promise<OrdersResDto> {
    return await this.orderService.getAcceptedOrders();
  }

  @Get('/completed')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getCompletedOrders(): Promise<OrdersResDto> {
    return await this.orderService.getCompletedOrders();
  }

  @Post('/accepted')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async acceptOrder(@Body() updateOrderReqDto: UpdateOrderReqDto) {
    return await this.orderService.updateOrderStatusToAccepted(
      updateOrderReqDto
    );
  }

  @Post('/rejected')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async rejectOrder(@Body() updateOrderReqDto: UpdateOrderReqDto) {
    return await this.orderService.updateOrderStatusToRejected(
      updateOrderReqDto
    );
  }

  @Post('/completed')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async completeOrder(@Body() updateOrderReqDto: UpdateOrderReqDto) {
    return await this.orderService.updateOrderStatusToCompleted(
      updateOrderReqDto
    );
  }

  @UseGuards(JwtGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getOrders(@Req() req: Request): Promise<OrdersResDto> {
    const { id } = req.user as JwtPayload;
    return await this.orderService.getOrders(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getOrderStatus(
    @Req() req: Request,
    @Param('id', ParseIntPipe) orderId: number
  ) {
    const user = req.user as JwtPayload;
    const userId = user.id;
    const status: ORDER_STATUS = await this.orderService.getOrderStatus(
      userId,
      orderId
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
