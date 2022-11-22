import React from 'react';
import { Container, Minus, Plus } from './styled';

interface Props {
  quantity: number;
  onClick: (quantity: number) => void;
}

function QuantitySelector({ quantity, onClick }: Props) {
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
      <Minus
        name="minus"
        onClick={handleClickQuantity}
        quantity={quantity.toString()}
      />
      {quantity}
      <Plus
        name="plus"
        onClick={handleClickQuantity}
        quantity={quantity.toString()}
      />
    </Container>
  );
}

export default QuantitySelector;
