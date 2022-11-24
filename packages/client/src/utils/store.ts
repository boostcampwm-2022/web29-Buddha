import { atom } from 'recoil';
import { CartMenu } from '@/types/Cart';

export const cartState = atom<CartMenu[]>({
  key: 'cartState',
  default: [],
});
