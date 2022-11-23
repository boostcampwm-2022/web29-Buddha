import CartFooter from '@/components/CartFooter';
import { CartPageWrapper, CartHeader, CartContentWrapper } from './styled';

function Cart() {
  return (
    <CartPageWrapper>
      <CartHeader>
        <p className={'title'}>장바구니</p>
        <p className={'input-cafe'}>주문할 매장을 선택해주세요</p>
      </CartHeader>
      <CartContentWrapper>
        <p className={'title'}>담은 상품 0개</p>
        <div></div>
      </CartContentWrapper>
      <CartFooter />
    </CartPageWrapper>
  );
}

export default Cart;
