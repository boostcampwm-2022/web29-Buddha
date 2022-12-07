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
  COMPLETED: 'wd-100',
};

export const PROGRESS_IMAGE = {
  REQUESTED: 'https://kr.object.ncloudstorage.com/buddha-dev/requested.gif',
  ACCEPTED: 'https://kr.object.ncloudstorage.com/buddha-dev/making.gif',
  COMPLETED: 'https://kr.object.ncloudstorage.com/buddha-dev/completed.gif',
};
