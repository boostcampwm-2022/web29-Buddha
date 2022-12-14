/**
 * 주문 내역 전체 조회?
 */
export const orderListData = {
  orders: [
    {
      id: 1,
      status: 'COMPLETED',
      date: '2022-11-22',
      cafeId: 1,
      menus: [
        { id: 1, name: '아메리카노', price: 9000, count: 2, options: {} },
        { id: 2, name: '카페라떼', price: 6000, count: 1, options: {} },
      ],
    },
    {
      id: 2,
      status: 'COMPLETED',
      date: '2022-11-22',
      cafeId: 1,
      menus: [
        { id: 1, name: '아메리카노', price: 5500, count: 1, options: {} },
      ],
    },
    {
      id: 3,
      status: 'COMPLETED',
      date: '2022-11-21',
      cafeId: 1,
      menus: [{ id: 2, name: '카페라떼', price: 6000, count: 1, options: {} }],
    },
    {
      id: 4,
      status: 'REQUESTED',
      date: '2022-12-01',
      cafeId: 1,
      menus: [
        {
          id: 57,
          name: '화이트 초콜릿 모카',
          price: 5000,
          count: 1,
          options: { 1: '에스프레소 샷 추가' },
        },
      ],
    },
  ],
};

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
          count: 1,
          price: 5000,
        },
      ],
      status: 'REQUESTED',
    },
  ],
};

export const acceptedOrderData = {
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
          count: 1,
          price: 5000,
        },
      ],
      status: 'ACCEPTED',
    },
  ],
};

export const orderStatusData = {
  REQUESTED: {
    status: 'REQUESTED',
    id: 1,
    menus: [
      {
        name: '아메리카노',
      },
    ],
  },
  ACCEPTED: {
    status: 'ACCEPTED',
    id: 1,
    menus: [
      {
        name: '아메리카노',
      },
    ],
  },
  COMPLETED: {
    status: 'COMPLETED',
    id: 1,
    menus: [
      {
        name: '아메리카노',
      },
    ],
  },
  REJECTED: {
    status: 'REJECTED',
    id: 1,
    menus: [
      {
        name: '아메리카노',
      },
    ],
  },
};
