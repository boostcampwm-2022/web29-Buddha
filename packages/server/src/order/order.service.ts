import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cafe } from 'src/cafe/entities/cafe.entity';
import { Menu } from 'src/cafe/entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderMenu } from './entities/orderMenu.entity';
import { ORDER_STATUS } from './enum/orderStatus.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  async getOrders(userId) {
    const user = new User();
    user.id = userId;
    const orders = await this.orderRepository.find({
      relations: {
        cafe: true,
        orderMenus: { menu: true },
      },
      where: {
        user: user,
      },
    });

    console.log(orders[0].orderMenus);

    return orders;
  }

  async create(userId, createOrderDto: CreateOrderDto) {
    const { menus, cafeId } = createOrderDto;

    const cafe = new Cafe();
    cafe.id = cafeId;

    const user = new User();
    user.id = userId;

    const order = new Order();
    order.cafe = cafe;
    order.status = ORDER_STATUS.REQUESTED;
    order.user = user;

    const orderMenus = menus.map((menu) => {
      const orderMenu = new OrderMenu();
      const menuObj = new Menu();

      menuObj.id = menu.id;
      orderMenu.price = menu.price;
      orderMenu.options = menu.options.join(',');
      orderMenu.size = menu.size;
      orderMenu.type = menu.type;
      orderMenu.count = menu.count;

      orderMenu.menu = menuObj;
      orderMenu.order = order;

      return orderMenu;
    });

    order.orderMenus = orderMenus;

    await this.orderRepository.save(order);
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
