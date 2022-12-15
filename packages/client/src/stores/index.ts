import { atom } from 'recoil';
import { CartMenu, UserRole } from '@/types';

export const cartState = atom<CartMenu[]>({
  key: 'cartState',
  default: [],
});

export const userRoleState = atom<UserRole>({
  key: 'userRoleState',
  default: 'UNAUTH',
});

export const isToastState = atom({
  key: 'isToastState',
  default: false,
});

export const toastMessageState = atom({
  key: 'toastMessageState',
  default: '',
});
