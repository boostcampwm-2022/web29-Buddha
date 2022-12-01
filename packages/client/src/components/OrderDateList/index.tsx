import { useMemo } from 'react';

import OrderList from 'components/OrderList';

import { Order, OrderStatusCode } from '@/types';
import { Container, ItemContainer } from './styled';
import useOrderGroup from 'hooks/useOrderDates';

interface Props {
  list: Order[];
  status?: OrderStatusCode[];
}

interface ItemProps {
  date: string;
  orders: Order[];
}

function OrderDateItem({ date, orders }: ItemProps) {
  return (
    <ItemContainer>
      <p>{date}</p>
      <OrderList date={date} orders={orders} />
    </ItemContainer>
  );
}

function OrderDateList({ list, status }: Props) {
  const { orderGroup } = useOrderGroup({ list, status });

  const items = useMemo(() => {
    return Object.keys(orderGroup).map((date) => (
      <OrderDateItem date={date} orders={orderGroup[date]} key={date} />
    ));
  }, [orderGroup]);

  return <Container>{items}</Container>;
}

export default OrderDateList;
