import { getPriceComma } from '@/utils';
import { useMemo } from 'react';
import { HistoryMenu } from 'types/OrderList';
import { Container, DivisionLine, ItemContainer, PriceText } from './styled';

interface Props {
  date: string;
  menus: HistoryMenu[];
  type: 'customer' | 'managerRequest' | 'managerAccepted';
}

function HistoryDetail({ date, menus, type }: Props) {
  const totalPrice = useMemo(() => {
    return menus.reduce((prev, curr) => prev + curr.price, 0);
  }, [menus]);

  /**
   * 메뉴 종류별로
   */
  const items = menus.map((m) => (
    <ItemContainer key={`${date}-${m.id}`}>
      <p>{m.name}</p>
      <PriceText>{`${getPriceComma(m.price)} 원`}</PriceText>
    </ItemContainer>
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

export default HistoryDetail;
