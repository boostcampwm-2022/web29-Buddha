import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload';
import { identity } from 'rxjs';
import { UpdateOrderReqDto } from './dto/updateOrderReq.dto';
import { OrderStatusResDto } from './dto/OrderStatusRes.dto';
import { CreateOrderDto } from './dto/create-order.dto';
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('insert-test')
  async testInsert(@Body() body) {
    const { id, status } = body;
    await this.orderService.testInsert(id, status);
  }

  /**
   * 고객 polling - O
   * 점주 polling
   * 점주 주문 수락
   */

  // 고객 - 주문 상태 조회 Polling
  // 응답 - orderStatus: ORDER_STATUS ENUM
  @Get()
  @UseGuards(JwtGuard)
  async getOrderStatus(
    @Query('orderId', ParseIntPipe) orderId: number,
    @Query('cafeId', ParseIntPipe) cafeId: number
  ): Promise<OrderStatusResDto> {
    return await this.orderService.getOrderStatusV3(cafeId, orderId);
  }

  // 점주 - '요청 상태' 주문 내역 조회 Polling
  // cursor 뒤에 있는 모든 order 내역 반환
  // 응답 - Order[]
  @Get('/requested')
  @UseGuards(JwtGuard)
  async getRenewedRequested(
    @Req() req: Request,
    @Query('cursor', ParseIntPipe) cursor: number
  ) {
    // const user = req.user as JwtPayload;
    // const { id } = user;
    // cafeId를 유저의 카페로 가져와야한다.
    const cafeId = 1;
    return await this.orderService.getNewCachedOrdersV3(cafeId, cursor);
  }

  @Post('/accepted')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async acceptOrder(@Body() updateOrderReqDto: UpdateOrderReqDto) {
    // const user = req.user as JwtPayload;
    // const { id } = user;
    // cafeId를 유저의 카페로 가져와야한다.
    const cafeId = 1;
    await this.orderService.updateOrderStatusToAcceptedV3(
      cafeId,
      updateOrderReqDto
    );
    return;
  }

  @Post('/rejected')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async rejectOrder(@Body() updateOrderReqDto: UpdateOrderReqDto) {
    // const user = req.user as JwtPayload;
    // const { id } = user;
    // cafeId를 유저의 카페로 가져와야한다.
    const cafeId = 1;
    await this.orderService.updateOrderStatusToRejectedV3(
      cafeId,
      updateOrderReqDto
    );
    return;
  }

  @Post('/completed')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async completeOrder(@Body() updateOrderReqDto: UpdateOrderReqDto) {
    // const user = req.user as JwtPayload;
    // const { id } = user;
    // cafeId를 유저의 카페로 가져와야한다.
    const cafeId = 1;
    await this.orderService.updateOrderStatusToCompletedV3(
      cafeId,
      updateOrderReqDto
    );
    return;
  }

  @Post('')
  @HttpCode(201)
  @UseGuards(JwtGuard)
  async createOrder(
    @Req() req: Request,
    @Body() createOrderDto: CreateOrderDto
  ) {
    const user = req.user as JwtPayload;
    const { id } = user;
    return await this.orderService.createOrderV3(id, createOrderDto);
  }
}
