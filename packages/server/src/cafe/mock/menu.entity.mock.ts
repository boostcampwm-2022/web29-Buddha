import { MENU_TYPE } from 'src/cafe/enum/menuType.enum';

export const mockMenus = {
  1: {
    id: 1,
    name: '커피1',
    description: '목 데이터 커피 1',
    price: 5000,
    category: '카테고리1',
    thumbnail: '썸네일1',
    type: MENU_TYPE.HOT,
  },
  2: {
    id: 2,
    name: '커피2',
    description: '목 데이터 커피 2',
    price: 4000,
    category: '카테고리2',
    thumbnail: '썸네일2',
    type: MENU_TYPE.ICED,
  },
  3: {
    id: 3,
    name: '커피3',
    description: '목 데이터 커피 3',
    price: 3000,
    category: '카테고리3',
    thumbnail: '썸네일3',
    type: MENU_TYPE.HOT,
  },
  4: {
    id: 4,
    name: '커피4',
    description: '목 데이터 커피 4',
    price: 3000,
    category: '카테고리1',
    thumbnail: '썸네일4',
    type: MENU_TYPE.HOT,
  },
};
