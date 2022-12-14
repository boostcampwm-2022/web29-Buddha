import { Size } from './types';

export const PLACEHOLDER = {
  nickname: '닉네임을 입력해주세요. 알파벳, 숫자만 사용',
  corporate: '사업자 등록 번호를 입력해주세요.',
};

export const SIZES: Size[] = ['tall', 'grande', 'venti'];

export const SIZE_VOLUME = {
  tall: 355,
  grande: 473,
  venti: 591,
};

export const CART_KEY = 'buddhaCart';

export const PROGRESS_CLASS = {
  REQUESTED: 'wd-10',
  ACCEPTED: 'wd-50',
  REJECTED: 'wd-0',
  COMPLETED: 'wd-100',
};

export const PROGRESS_IMAGE = {
  REQUESTED: 'https://kr.object.ncloudstorage.com/buddha-dev/requested.gif',
  ACCEPTED: 'https://kr.object.ncloudstorage.com/buddha-dev/making.gif',
  REJECTED: 'https://kr.object.ncloudstorage.com/buddha-dev/rejected.gif',
  COMPLETED: 'https://kr.object.ncloudstorage.com/buddha-dev/completed.gif',
};

export const QUERY_KEYS = {
  MENU_LIST_DATA: 'menu-list',
  ORDER_STATUS: 'order-status',
  USER_ROLE: 'user-role',
  ORDER_LIST: 'order-list',
  ACCEPTED_LIST: 'accepted-list',
};

export const USER_ROLE = {
  CLIENT: 'CLIENT',
  MANAGER: 'MANAGER',
  UNAUTH: 'UNAUTH',
};
