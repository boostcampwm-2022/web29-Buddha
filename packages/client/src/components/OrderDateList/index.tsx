import React, { memo, ReactNode, useMemo } from 'react';

import OrderList from 'components/OrderList';

import { Order, OrderStatusCode } from '@/types';
import { Container, ItemContainer, NoOrderContainer } from './styled';
import useOrderGroup from 'hooks/useOrderDates';
import { sortDateDesc } from '@/utils';
import { useRecoilValue } from 'recoil';
import { userRoleState } from '@/stores';

interface Props {
  list: Order[];
  status?: OrderStatusCode[];
  noBottomPadding?: boolean;
}

interface ItemProps {
  date: string;
  orders: Order[];
}

const NoOrder = function ({ children }: { children: ReactNode }) {
  return <NoOrderContainer>{children}</NoOrderContainer>;
};

const OrderDateItem = memo(function ({ date, orders }: ItemProps) {
  return (
    <ItemContainer>
      <p className="date-title">{date}</p>
      <OrderList date={date} orders={orders} />
    </ItemContainer>
  );
});

function OrderDateList({ list, status, noBottomPadding }: Props) {
  const userRole = useRecoilValue(userRoleState);
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
    <Container noBottomPadding={noBottomPadding}>
      {items.length > 0 || !noBottomPadding ? (
        items
      ) : (
        <NoOrder>진행중인 내역이 없습니다...</NoOrder>
      )}
      {userRole === 'MANAGER' && items.length === 0 && (
        <NoOrder>요청 내역이 없습니다...</NoOrder>
      )}
    </Container>
  );
}

export default memo(OrderDateList);
