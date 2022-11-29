import { atom } from 'recoil';
import { CartMenu } from '@/types';

export const cartState = atom<CartMenu[]>({
  key: 'cartState',
  default: [],
});

type userRole = 'CLIENT' | 'MANAGER';
export const userRoleState = atom<userRole>({
  key: 'userRoleState',
  default: 'CLIENT',
});
