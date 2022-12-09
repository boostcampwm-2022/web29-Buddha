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

export const requestedOrderData = {
  orders: [
    {
      cafeId: 1,
      date: '2022-12-08-23:12-목요일',
      id: 37,
      menus: [
        {
          id: 57,
          name: '화이트 초콜릿 모카',
          options: { 1: '에스프레소 샷 추가' },
          price: 5000,
        },
      ],
      status: 'REQUESTED',
    },
  ],
};

export const orderStatusData = {
  REQUESTED: {
    order_status: 'REQUESTED',
  },
  ACCEPTED: {
    order_status: 'ACCEPTED',
  },
  COMPLETED: {
    order_status: 'COMPLETED',
  },
}
