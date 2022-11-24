import React from 'react';
import { Container, Minus, Plus } from './styled';

interface Listener {
  onClick: (quantity: number) => void;
}

export interface Props {
  quantity: number;
  svgWidth: number;
  svgHeight: number;
}

function QuantitySelector({
  quantity,
  svgWidth,
  svgHeight,
  onClick,
}: Props & Listener) {
  const handleClickQuantity = (event: React.MouseEvent<SVGSVGElement>) => {
    const name = event.currentTarget.getAttribute('name');

    if (quantity === 1 && name === 'minus')
      return alert('최소 1개 이상 주문 가능합니다.');
    if (quantity === 20 && name === 'plus')
      return alert('최대 20개 주문 가능합니다.');

    if (name === 'minus') onClick(quantity - 1);
    else onClick(quantity + 1);
  };

  return (
    <Container>
      <>
        <Minus
          name="minus"
          quantity={quantity}
          width={svgWidth}
          height={svgHeight}
          onClick={handleClickQuantity}
        />
      </>
      {quantity}
      <>
        <Plus
          name="plus"
          quantity={quantity}
          width={svgWidth}
          height={svgHeight}
          onClick={handleClickQuantity}
        />
      </>
    </Container>
  );
}

export default QuantitySelector;
