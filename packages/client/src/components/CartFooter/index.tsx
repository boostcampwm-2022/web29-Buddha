import Button from 'components/Button';
import { CartFooterWrapper, CartFooterInfoWrapper } from './styled';
import { getPriceComma } from 'utils/index';
import { getCart } from 'utils/localStorage';
import { CartMenu } from '@/types/Cart';

interface CartFooterProps {
  count: number;
  price: number;
}

function CartFooter({ count, price }: CartFooterProps) {
  const handleSubmit = () => {
    if (count === 0) return;
    const menus = getCart().map((menu: CartMenu) => ({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      size: menu.size,
      type: menu.type,
      quantity: menu.quantity,
      options: menu.options.map((option) => option.id),
    }));
    console.log({
      cafeId: 1,
      menus,
    });
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
