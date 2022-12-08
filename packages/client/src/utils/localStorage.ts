import { CART_KEY } from '@/constants';
import { CartMenu } from '@/types';

/**
 * 장바구니 배열 return
 */
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
};

/**
 * 장바구니 담긴 갯수 return
 */
export const getCartCount = () => {
  const cart = getCart();
  let count = 0;

  cart.forEach((menu: CartMenu) => {
    count += menu.count;
  });

  return count;
};

export const getCartPrice = () => {
  const cart = getCart();
  let price = 0;

  cart.forEach((menu: CartMenu) => {
    price += menu.price * menu.count;
  });

  return price;
};

export const getMenu = (menu: CartMenu) => {
  return getCart().find((cart: CartMenu) => {
    return isEqualJSON(menu, cart);
  });
};

export const getMenuIdx = (menu: CartMenu) => {
  return getCart().findIndex((cart: CartMenu) => {
    return isEqualJSON(menu, cart);
  });
};

const isEqualJSON = (a: Object, b: Object) => {
  return (
    JSON.stringify(Object.entries(a).sort()) ===
    JSON.stringify(Object.entries(b).sort())
  );
};

export const setLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};
