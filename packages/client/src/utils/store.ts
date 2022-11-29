import { atom } from 'recoil';
import { CartMenu } from '@/types/Cart';

export const cartState = atom<CartMenu[]>({
  key: 'cartState',
  default: [],
});

type userRole = 'CLIENT' | 'MANAGER';
export const userRoleState = atom<userRole>({
  key: 'userRoleState',
  default: 'CLIENT',
});
