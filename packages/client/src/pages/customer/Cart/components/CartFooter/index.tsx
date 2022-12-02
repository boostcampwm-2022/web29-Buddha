import Button from 'components/Button';
import { CartFooterWrapper, CartFooterInfoWrapper } from './styled';
import { getPriceComma } from 'utils/index';
import { getCart } from 'utils/localStorage';
import { CartMenu } from '@/types';
import { CART_KEY } from '@/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CartFooterProps {
  count: number;
  price: number;
}

function CartFooter({ count, price }: CartFooterProps) {
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const cafeId = 1;

  const handleSubmit = async () => {
    if (count === 0) return;
    const menus = getCart().map((menu: CartMenu) => ({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      size: menu.size,
      type: menu.type,
      count: menu.count,
      options: menu.options.map((option) => option.id),
    }));

    try {
      await axios.post(
        `${api}/order`,
        { cafeId, menus },
        { withCredentials: true }
      );
      window.localStorage.removeItem(CART_KEY);
      alert('주문 완료');
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartFooterWrapper>
      <CartFooterInfoWrapper>
        <p className={'cart-number'}>총 {count}개</p>
        <p className={'cart-price'}>{getPriceComma(price)}원</p>
      </CartFooterInfoWrapper>
      <Button className={count > 0 ? '' : 'disabled'} onClick={handleSubmit}>
        주문하기
      </Button>
    </CartFooterWrapper>
  );
}

export default CartFooter;
