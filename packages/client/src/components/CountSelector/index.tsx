import { toastMessageState } from '@/stores';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Container, Minus, Plus } from './styled';

interface Listener {
  onClick: (count: number) => void;
}

export interface Props {
  count: number;
  svgWidth?: number;
  svgHeight?: number;
}

function CountSelector({
  count,
  svgWidth = 1,
  svgHeight = 1,
  onClick,
}: Props & Listener) {
  const setToastMessage = useSetRecoilState(toastMessageState);

  const handleClickCount = (event: React.MouseEvent<SVGSVGElement>) => {
    const name = event.currentTarget.getAttribute('name');

    if (count === 1 && name === 'minus')
      return setToastMessage('최소 1개 이상 주문 가능합니다.');
    if (count === 20 && name === 'plus')
      return setToastMessage('최대 20개 주문 가능합니다.');

    if (name === 'minus') onClick(count - 1);
    else onClick(count + 1);
  };

  return (
    <Container>
      <>
        <Minus
          name="minus"
          data-testid="minus"
          count={count}
          width={svgWidth}
          height={svgHeight}
          onClick={handleClickCount}
        />
      </>
      {count}
      <>
        <Plus
          name="plus"
          data-testid="plus"
          count={count}
          width={svgWidth}
          height={svgHeight}
          onClick={handleClickCount}
        />
      </>
    </Container>
  );
}

export default CountSelector;
