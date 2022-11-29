import { useMemo } from 'react';

import { DetailStatus, OrderDetailMenu, OrderStatus } from '@/types';
import { getPriceComma } from '@/utils';
import { Container, DivisionLine, ItemContainer, PriceText } from './styled';

interface Props {
  date: string;
  menus: OrderDetailMenu[];
  detailStatus?: DetailStatus;
}

interface ItemProps {
  date: string;
  menu: OrderDetailMenu;
}

function OrderDetailItem({ date, menu }: ItemProps) {
  return (
    <ItemContainer key={`${date}-${menu.id}`}>
      <p>{menu.name}</p>
      <PriceText>{`${getPriceComma(menu.price)} 원`}</PriceText>
    </ItemContainer>
  );
}

function OrderDetailList({ date, menus, detailStatus }: Props) {
  const totalPrice = useMemo(() => {
    return menus.reduce((prev, curr) => prev + curr.price, 0);
  }, [menus]);

  /**
   * 메뉴 종류별로
   */
  const items = menus.map((menu) => (
    <OrderDetailItem date={date} menu={menu} key={menu.id} />
  ));

  return (
    <Container>
      {items}
      <DivisionLine />
      <ItemContainer>
        <p>총 액</p>
        <PriceText>{`${getPriceComma(totalPrice)} 원`}</PriceText>
      </ItemContainer>
    </Container>
  );
}

export default OrderDetailList;
