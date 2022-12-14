import { useState } from 'react';
import { getCart, getCartCount, getCartPrice } from 'utils/localStorage';
import CartFooter from '@/pages/customer/Cart/components/CartFooter';
import {
  CartPageWrapper,
  CartHeader,
  CartContentWrapper,
  FixedHeader,
} from './styled';
import { CartMenu } from '@/types';
import CartItem from '@/pages/customer/Cart/components/CartItem';
import { CART_KEY } from '@/constants';
import EmptyCart from '@/pages/customer/Cart/components/EmptyCart';
import LeftArrow from '@/components/LeftArrow';

function Cart() {
  const [cart, setCart] = useState<CartMenu[]>(getCart());
  const [cartCount, setCartCount] = useState<number>(getCartCount());
  const [cartPrice, setCartPrice] = useState<number>(getCartPrice());

  const setCount = (idx: number, count: number) => {
    let newCart = [...cart];
    newCart[idx].count = count;
    setNewCart(newCart);
  };

  const deleteMenu = (idx: number) => {
    let newCart = cart.filter((menu, index) => index !== idx);
    setNewCart(newCart);
  };

  const setNewCart = (newCart: CartMenu[]) => {
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    setCartCount(getCartCount());
    setCartPrice(getCartPrice());
  };

  return (
    <CartPageWrapper>
      <FixedHeader>
        <LeftArrow color="white" left={0.5} top={0.5} />
      </FixedHeader>
      <CartHeader>
        <p className={'title'}>장바구니</p>
        <p className={'input-cafe'}>주문할 매장을 선택해주세요</p>
      </CartHeader>
      <CartContentWrapper data-testid={'cart-content'}>
        <p className={'title'}>담은 상품 {cartCount}개</p>
        {cartCount > 0 ? (
          <ul>
            {cart.map((menu, idx) => (
              <CartItem
                key={idx}
                menu={menu}
                setCount={setCount}
                deleteMenu={deleteMenu}
              />
            ))}
          </ul>
        ) : (
          <EmptyCart />
        )}
      </CartContentWrapper>
      <CartFooter count={cartCount} price={cartPrice} />
    </CartPageWrapper>
  );
}

export default Cart;
