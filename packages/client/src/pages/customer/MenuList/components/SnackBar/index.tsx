import { useNavigate } from 'react-router-dom';
import { SnackBarWrapper, CartWrapper } from './styled';
import { ReactComponent as Cart } from 'icons/cart.svg';
import { getCartCount } from 'utils/localStorage';

function SnackBar() {
  const navigate = useNavigate();

  const handleClickCart = () => {
    navigate('/cart');
  };

  return (
    <SnackBarWrapper data-testid={'snack-bar'}>
      <p>주문할 매장을 선택해주세요</p>
      <CartWrapper onClick={handleClickCart}>
        <p>{`장바구니 ${getCartCount()}개`}</p>
        <Cart />
      </CartWrapper>
    </SnackBarWrapper>
  );
}

export default SnackBar;
