import { History } from '@/types/OrderList';
import { getPriceComma } from '@/utils';
import { useMemo, useState } from 'react';
import HistoryDetail from '../HistoryDetail';
import {
  Container,
  DownArrow,
  Overview,
  PriceText,
  Receipt,
  RowContainer,
} from './styled';

interface Props {
  history: History;
  date: string;
}

/**
 * 날짜별 내역 목록 아이템
 */
function HistoryItem({ date, history }: Props) {
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
          <PriceText>{`${getPriceComma(totalPrice)} 원`}</PriceText>
          <DownArrow onClick={handleClickOpen} />
        </RowContainer>
      </Overview>
      {isOpen && (
        <HistoryDetail date={date} menus={history.menus} type={'customer'} />
      )}
    </Container>
  );
}

export default HistoryItem;
