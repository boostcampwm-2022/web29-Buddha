import { History } from '@/types/OrderList';
import { getPriceComma } from '@/utils';
import { useMemo, useState } from 'react';
import {
  Container,
  DownArrow,
  Overview,
  Receipt,
  RowContainer,
} from './styled';

interface Props {
  history: History;
}

function HistoryItem({ history }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * 아래 화살표 클릭 시, 세부정보 보기 on/off
   */
  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  /**
   * 현재 주문의 전체 가격 계산
   */
  const totalPrice = useMemo(
    () => history.menus.reduce((prev, curr) => prev + curr.price, 0),
    [history]
  );

  return (
    <Container>
      <Overview>
        <RowContainer>
          <Receipt />
          <p>
            {history.menus[0].name}
            {history.menus.length > 1
              ? ` 외 ${history.menus.length - 1}개`
              : ''}
          </p>
        </RowContainer>
        <RowContainer>
          <p>{getPriceComma(totalPrice)} 원</p>
          <DownArrow onClick={handleClickOpen} />
        </RowContainer>
      </Overview>
      {isOpen && <p>세부정보</p>}
    </Container>
  );
}

export default HistoryItem;
