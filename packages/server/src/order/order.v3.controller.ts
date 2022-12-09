import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
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

  @Get()
  @UseGuards(JwtGuard)
  async getOrderStatus(
    @Query('orderId', ParseIntPipe) orderId: number,
    @Query('cafeId', ParseIntPipe) cafeId: number
  ) {
    return await this.orderService.getOrderStatusV3(cafeId, orderId);
  }

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
}
