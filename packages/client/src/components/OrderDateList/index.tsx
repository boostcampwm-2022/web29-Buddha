import { memo, useMemo } from 'react';

import OrderList from 'components/OrderList';

import { Order, OrderStatusCode } from '@/types';
import { Container, ItemContainer, NoOrderContainer } from './styled';
import useOrderGroup from 'hooks/useOrderDates';
import { sortDateDesc } from '@/utils';

interface Props {
  list: Order[];
  status?: OrderStatusCode[];
  noBottomPadding?: boolean;
}

interface ItemProps {
  date: string;
  orders: Order[];
}

const NoOrder = function () {
  return <NoOrderContainer>진행중인 내역이 없습니다...</NoOrderContainer>;
};

const OrderDateItem = memo(function ({ date, orders }: ItemProps) {
  return (
    <ItemContainer>
      <p>{date}</p>
      <OrderList date={date} orders={orders} />
    </ItemContainer>
  );
});

function OrderDateList({ list, status, noBottomPadding }: Props) {
  const { orderGroup } = useOrderGroup({ list, status });

  const items = useMemo(() => {
    return Object.keys(orderGroup)
      .sort(sortDateDesc)
      .map((date) => {
        return (
          <OrderDateItem date={date} orders={orderGroup[date]} key={date} />
        );
      });
  }, [orderGroup]);

  return (
    <Container noBottomPadding={noBottomPadding} >
      {items.length > 0 ? items : <NoOrder />}
    </Container>
  );
}

export default memo(OrderDateList);
