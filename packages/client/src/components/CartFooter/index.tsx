import Button from 'components/Button';
import { CartFooterWrapper, CartFooterInfoWrapper } from './styled';

function CartFooter() {
  return (
    <CartFooterWrapper>
      <CartFooterInfoWrapper>
        <p className={'cart-number'}>총 0개</p>
        <p className={'cart-price'}>0원</p>
      </CartFooterInfoWrapper>
      <Button className={'disabled'}>주문하기</Button>
    </CartFooterWrapper>
  );
}

export default CartFooter;
