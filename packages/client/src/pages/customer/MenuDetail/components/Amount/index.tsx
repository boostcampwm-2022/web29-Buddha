import CountSelector from '@/components/CountSelector';
import { useMenuDetailDispatch } from '@/stores/MenuDetail';
import { getPriceComma } from '@/utils';
import { memo } from 'react';
import { Container } from './styled';

interface Props {
  price: number;
  count: number;
}

function Amount({ price, count }: Props) {
  const dispatch = useMenuDetailDispatch();

  /**
   * 수량 선택에 따라 수량 변경
   */
  const handleClickCount = (newCount: number) => {
    dispatch({ type: 'SET_COUNT', count: newCount });
  };

  return (
    <Container>
      <p className="price">{getPriceComma(price * count)}원</p>
      <CountSelector
        count={count}
        svgWidth={1}
        svgHeight={1}
        onClick={handleClickCount}
      />
    </Container>
  );
}

export default memo(Amount);
