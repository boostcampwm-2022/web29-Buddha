import { useState } from 'react';
import { getCart, getCartCount, getCartPrice } from 'utils/localStorage';
import CartFooter from '@/components/CartFooter';
import {
  CartPageWrapper,
  CartHeader,
  CartContentWrapper,
  LeftArrow,
  FixedHeader,
} from './styled';
import { CartMenu } from 'types/Cart';
import CartItem from '@/components/CartItem';
import { CART_KEY } from '@/constants';
import EmptyCart from '@/components/EmptyCart';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState<CartMenu[]>(getCart());
  const [cartCount, setCartCount] = useState<number>(getCartCount());
  const [cartPrice, setCartPrice] = useState<number>(getCartPrice());
  const navigate = useNavigate();

  const setQuantity = (idx: number, quantity: number) => {
    let newCart = [...cart];
    newCart[idx].quantity = quantity;
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

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <CartPageWrapper>
      <FixedHeader>
        <LeftArrow onClick={handleClickBack} />
      </FixedHeader>
      <CartHeader>
        <p className={'title'}>장바구니</p>
        <p className={'input-cafe'}>주문할 매장을 선택해주세요</p>
      </CartHeader>
      <CartContentWrapper>
        <p className={'title'}>담은 상품 {cartCount}개</p>
        {cartCount > 0 ? (
          <ul>
            {cart.map((menu, idx) => (
              <CartItem
                key={idx}
                menu={menu}
                setQuantity={setQuantity}
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
