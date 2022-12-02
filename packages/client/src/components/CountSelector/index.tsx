import React from 'react';
import { Container, Minus, Plus } from './styled';

interface Listener {
  onClick: (count: number) => void;
}

export interface Props {
  count: number;
  svgWidth: number;
  svgHeight: number;
}

function CountSelector({
  count,
  svgWidth,
  svgHeight,
  onClick,
}: Props & Listener) {
  const handleClickCount = (event: React.MouseEvent<SVGSVGElement>) => {
    const name = event.currentTarget.getAttribute('name');

    if (count === 1 && name === 'minus')
      return alert('최소 1개 이상 주문 가능합니다.');
    if (count === 20 && name === 'plus')
      return alert('최대 20개 주문 가능합니다.');

    if (name === 'minus') onClick(count - 1);
    else onClick(count + 1);
  };

  return (
    <Container>
      <>
        <Minus
          name="minus"
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
