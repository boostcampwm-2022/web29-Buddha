import { rest } from 'msw';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

export const menuHandlers = [
  rest.get(`${api}/cafe/1/menus`, (req, res, next) => {
    return res(
      next.json({
        id: 1,
        cafe_name: 'Cafe name 1',
        menus: [
          {
            id: 1,
            name: '카페 아메리카노',
            thumbnail:
              'https://www.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg',
            price: 1000,
          },
          {
            id: 2,
            name: 'Menu name 2',
            thumbnail: 'Menu Thumbnail',
            price: 1000,
          },
          {
            id: 3,
            name: 'Menu name 3',
            thumbnail: 'Menu Thumbnail',
            price: 1000,
          },
        ],
      })
    );
  }),
];
