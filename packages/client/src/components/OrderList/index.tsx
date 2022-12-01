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
import axios from 'axios';

interface Props {
  date: string;
  orders: Order[];
}

interface ItemProps {
  date: string;
  order: Order;
}

function OrderItem({ date, order }: ItemProps) {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => setIsOpen(!isOpen);

  const handleClickOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    const text = event.currentTarget.innerHTML;

    const postOrder = async () => {
      let action;
      if (text === '수락') action = 'accepted';
      else if (text === '거절') action = 'rejected';
      else if (text === '제조 완료') action = 'completed';

      try {
        await axios.post(
          `${api}/order/${action}`,
          { id: order.id, newStatus: action?.toUpperCase() },
          { withCredentials: true }
        );
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
