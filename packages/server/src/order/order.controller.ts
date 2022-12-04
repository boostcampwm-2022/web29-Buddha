import { UpdateOrderReqDto } from './dto/updateOrderReq.dto';
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
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersResDto } from './dto/ordersRes.dto';
import { ORDER_STATUS } from './enum/orderStatus.enum';
import { RedisCacheService } from 'src/redisCache/redisCache.service';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly redisCacheService: RedisCacheService
  ) {}
  @Get('test-insert')
  async testInsert() {
    // @Query('orderId') orderId: number // @Query('cafeId') cafeId: number,
    for (let i = 1; i < 101; i++) {
      for (
        let orderId = 400 * (i - 1) + 1;
        orderId < 400 * (i - 1) + 11;
        orderId++
      ) {
        const result = await this.redisCacheService.insertCachedOrder(
          i,
          orderId.toString(),
          'REQUESTED'
        );
      }
    }
    return;
  }

  @Get('test-get')
  async testGet(
    @Query('cafeId') cafeId: number,
    @Query('orderId') orderId: number
  ) {
    const result = await this.redisCacheService.getCachedOrder(cafeId, orderId);
    return result;
  }

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
    const user = req.user as JwtPayload;
    const { id } = user;
    const orders = await this.orderService.getOrders(id);
    return new OrdersResDto(orders);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getOrderStatus(
    @Req() req: Request,
    @Param('id', ParseIntPipe) orderId: number
  ) {
    const cafeId = 1;
    const user = req.user as JwtPayload;
    const status: ORDER_STATUS = await this.orderService.getOrderStatus(
      cafeId.toString(),
      user.id,
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
