import { useMemo, useState } from 'react';

import OrderDetailList from 'components/OrderDetailList';

import { getPriceComma } from '@/utils';
import { Order } from '@/types';
import {
  Container,
  DownArrow,
  ItemContainer,
  Overview,
  PriceText,
  Receipt,
  RowContainer,
} from './styled';
import { useRecoilValue } from 'recoil';
import { userRoleState } from '@/utils/store';

interface Props {
  date: string;
  orders: Order[];
}

interface ItemProps {
  date: string;
  order: Order;
}

function OrderItem({ date, order }: ItemProps) {
  const userRole = useRecoilValue(userRoleState);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => setIsOpen(!isOpen);

  const totalPrice = useMemo(
    () => order.menus.reduce((prev, curr) => prev + curr.price, 0),
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
