/**
 * 주문 내역 전체 조회?
 */
export const orderListData = [
  {
    id: 1,
    status: 'COMPLETED',
    date: '2022-11-22',
    cafeId: 1,
    menus: [
      { id: 1, name: '아메리카노', price: 5500, options: [{}, {}] },
      { id: 1, name: '아메리카노', price: 5500, options: [{}, {}] },
      { id: 2, name: '카페라떼', price: 6000, options: [{}, {}] },
    ],
  },
  {
    id: 2,
    status: 'COMPLETED',
    date: '2022-11-22',
    cafeId: 1,
    menus: [
      { id: 1, name: '아메리카노', price: 5500, options: [{}, {}] },
      { id: 1, name: '아메리카노', price: 5500, options: [{}, {}] },
      { id: 2, name: '카페라떼', price: 6000, options: [{}, {}] },
    ],
  },
  {
    id: 3,
    status: 'COMPLETED',
    date: '2022-11-21',
    cafeId: 1,
    menus: [{ id: 1, name: '아메리카노', price: 5500, options: [] }],
  },
];
