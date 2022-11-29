import { useMemo } from 'react';
import useListByDate from '@/hooks/useListByDate';
import OrderList from '../OrderList';
import { Container, ItemContainer } from './styled';
import { Order } from '@/types';

interface Props {
  list: Order[];
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

function OrderDateList({ list }: Props) {
  const { listByDate } = useListByDate({ list });

  const items = useMemo(() => {
    return Object.keys(listByDate).map((date) => (
      <OrderDateItem date={date} orders={listByDate[date]} key={date} />
    ));
  }, [listByDate]);

  return <Container>{items}</Container>;
}

export default OrderDateList;
