import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import OrderDetailList from 'components/OrderDetailList';

import { getPriceComma } from '@/utils';
import { Order, OrderStatusCode } from '@/types';
import { QUERY_KEYS } from '@/constants';
import { customFetch } from '@/utils/fetch';
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
import { userRoleState } from '@/stores';

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
  const [isOpen, setIsOpen] = useState(userRole === 'MANAGER' ? true : false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const mutaion = useMutation({
    mutationFn: ({ action }: { action: OrderStatusCode }) =>
      customFetch({
        url: `/order/${action.toLowerCase()}`,
        method: 'POST',
        data: { id: order.id, newStatus: action },
      }),
    onSuccess: (data, { action }) => {
      return queryClient.invalidateQueries(
        action !== 'COMPLETED'
          ? [QUERY_KEYS.ORDER_LIST]
          : [QUERY_KEYS.ACCEPTED_LIST]
      );
    },
  });

  const handleClickOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const text = event.currentTarget.innerHTML;

    const postOrder = async () => {
      let action: OrderStatusCode | undefined;
      if (text === '수락') action = 'ACCEPTED';
      else if (text === '거절') action = 'REJECTED';
      else if (text === '제조 완료') action = 'COMPLETED';

      try {
        if (!action) throw Error();
        mutaion.mutate({ action });
      } catch (err) {
        alert('주문에 문제가 발생했습니다.');
      }
    };
    postOrder();
  };

  const totalPrice = useMemo(
    () => order.menus.reduce((prev, curr) => prev + curr.price, 0),
    [order]
  );

  const handleClickStatus = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (userRole === 'CLIENT') navigate(`/order/${order.id}`);
  };

  return (
    <ItemContainer>
      <Overview onClick={handleClickStatus} data-testid="order-overview">
        <RowContainer data-testid="order-overview-title">
          <Receipt />
          <p>
            {order.menus[0].name}
            {order.menus.length > 1 ? ` 외 ${order.menus.length - 1}개` : ''}
          </p>
        </RowContainer>
        <RowContainer
          className="detail-opener"
          onClick={handleClickOpen}
          data-testid="order-detail-btn"
        >
          <PriceText>{`${getPriceComma(totalPrice)} 원`}</PriceText>
          <DownArrow />
        </RowContainer>
      </Overview>
      {isOpen && (
        <OrderDetailList
          date={date}
          menus={order.menus}
          status={order.status}
          onClick={handleClickOrder}
        />
      )}
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
