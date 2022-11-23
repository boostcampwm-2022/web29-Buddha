import { useNavigate } from 'react-router-dom';
import { SnackBarWrapper, CartWrapper } from './styled';
import { ReactComponent as Cart } from 'icons/cart.svg';
import { getCartCount } from 'utils/index';

function SnackBar() {
  const navigate = useNavigate();

  const handleClickCart = () => {
    navigate('/cart');
  };

  return (
    <SnackBarWrapper>
      <p>주문할 매장을 선택해주세요</p>
      <CartWrapper onClick={handleClickCart}>
        <p>{`장바구니 ${getCartCount()}개`}</p>
        <Cart />
      </CartWrapper>
    </SnackBarWrapper>
  );
}

export default SnackBar;
