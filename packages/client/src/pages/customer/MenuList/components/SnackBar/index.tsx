import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Cart } from 'icons/cart.svg';
import { getCartCount } from 'utils/localStorage';
import { SnackBarWrapper, CartWrapper } from './styled';

function SnackBar() {
  const navigate = useNavigate();

  const handleClickCart = () => {
    navigate('/cart');
  };

  return (
    <SnackBarWrapper data-testid={'snack-bar'}>
      <p>주문할 매장을 선택해주세요</p>
      <CartWrapper onClick={handleClickCart} data-testid={'cart-button'}>
        <p>{`장바구니 ${getCartCount()}개`}</p>
        <Cart />
      </CartWrapper>
    </SnackBarWrapper>
  );
}

export default memo(SnackBar);
