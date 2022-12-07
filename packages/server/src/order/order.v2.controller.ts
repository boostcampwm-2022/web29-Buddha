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
import { OldRequestedOrdersDto } from './dto/oldRequestedOrdersDto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/renewed-requested')
  @UseGuards(JwtGuard)
  async getRenewedRequested(
    @Req() req: Request,
    @Body() oldRequestedOrders: OldRequestedOrdersDto
  ) {
    // const user = req.user as JwtPayload;
    // const { id } = user;
    // cafeId를 유저의 카페로 가져와야한다.
    const cafeId = 1;
    return await this.orderService.getCachedRequestedOrders(
      cafeId.toString(),
      new Set(
        oldRequestedOrders.oldRequestedOrderPks.map((pk) => pk.toString())
      )
    );
  }

  @Post('/test')
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

  @Get('/test')
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
