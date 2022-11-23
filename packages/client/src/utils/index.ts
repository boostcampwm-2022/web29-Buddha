import { CART_KEY } from '@/constants';
import { CartMenu } from 'types/Cart';

/**
 * 금액 세자리 단위 콤마 추가
 */
export const getPriceComma = (price: number | string) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 문자의 첫 글자만 대문자로 변경
 */
export const getFirstUpper = (text: string) => {
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
};

/**
 * 장바구니 담긴 갯수 return
 */
export const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  let count = 0;
  
  cart.forEach((menu: CartMenu) => {
    count += menu.quantity;
  });
  
  return count;
};
