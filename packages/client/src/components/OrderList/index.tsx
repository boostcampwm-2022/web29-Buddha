import { useMemo, useState } from 'react';

import { getPriceComma } from '@/utils';
import OrderDetailList from '../OrderDetailList';
import {
  Container,
  DownArrow,
  ItemContainer,
  Overview,
  PriceText,
  Receipt,
  RowContainer,
} from './styled';

interface Props {
  date: string;
  orders: any[];
}

interface ItemProps {
  date: string;
  order: any;
}

function OrderItem({ date, order }: ItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => setIsOpen(!isOpen);

  const totalPrice = useMemo(
    () => order.menus.reduce((prev: any, curr: any) => prev + curr.price, 0),
    [order]
  );

  return (
    <ItemContainer>
      <Overview>
        <RowContainer>
          <Receipt />
          <p>
            {order.menus[0].name}
            {order.menus.length > 1 ? ` 외 ${order.menus.length - 1}개` : ''}
          </p>
        </RowContainer>
        <RowContainer>
          <PriceText>{`${getPriceComma(totalPrice)} 원`}</PriceText>
          <DownArrow onClick={handleClickOpen} />
        </RowContainer>
      </Overview>
      {isOpen && <OrderDetailList date={date} menus={order.menus} />}
    </ItemContainer>
  );
}

function OrderList({ date, orders }: Props) {
  const items = useMemo(() => {
    return orders.map((order) => (
      <OrderItem date={date} order={order} key={order.id} />
    ));
  }, [date, orders]);

  return <Container>{items}</Container>;
}

export default OrderList;
