import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import OrderDetailList from 'components/OrderDetailList';

import { getPriceComma } from '@/utils';
import { Order } from '@/types';
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

interface Props {
  date: string;
  orders: Order[];
}

interface ItemProps {
  date: string;
  order: Order;
}

function OrderItem({ date, order }: ItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClickOpen = () => setIsOpen(!isOpen);

  const mutaion = useMutation({
    mutationFn: ({ action }: { action: string }) =>
      customFetch({
        url: `/order/${action}`,
        method: 'POST',
        data: { id: order.id, newStatus: action?.toUpperCase() },
      }),
    onSuccess: (data) => {
      return queryClient.invalidateQueries([QUERY_KEYS.ORDER_LIST]);
    },
  });

  const handleClickOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    const text = event.currentTarget.innerHTML;

    const postOrder = async () => {
      let action = '';
      if (text === '수락') action = 'accepted';
      else if (text === '거절') action = 'rejected';
      else if (text === '제조 완료') action = 'completed';

      try {
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

  return (
    <ItemContainer>
      <Overview>
        <RowContainer onClick={() => navigate(`/order/${order.id}`)}>
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
