import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { cartState } from 'utils/store';
import { SnackBarWrapper } from './styled';

function SnackBar() {
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();

  const handleClickCart = () => {
    navigate('/cart')
  }

  return (
    <SnackBarWrapper>
      <p>주문할 매장을 선택해주세요</p>
      <p onClick={handleClickCart}>장바구니 {cart.length}개</p>
    </SnackBarWrapper>
  );
}

export default SnackBar;
