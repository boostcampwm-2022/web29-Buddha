import { rest } from 'msw';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

const jsonMenuDetail = {
  id: 1,
  name: '자몽 허니 블랙 티',
  description:
    '새콤한 자몽과 달콤한 꿀이 깊고 그윽한 풍미의 스타벅스 티바나 블랙 티의 조합',
  price: 5700,
  thumbnail:
    'https://www.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000187]_20210419131229539.jpg',
  options: [
    {
      id: 1,
      name: '1',
      price: 500,
      category: '에스프레소 샷',
    },
    {
      id: 2,
      name: '2',
      price: 1000,
      category: '에스프레소 샷',
    },
    {
      id: 3,
      name: '3',
      price: 1500,
      category: '에스프레소 샷',
    },
    {
      id: 4,
      name: '1',
      price: 500,
      category: '클래식 시럽',
    },
    {
      id: 5,
      name: '2',
      price: 1000,
      category: '클래식 시럽',
    },
  ],
};
export const menuHandlers = [
  // 메뉴 상세 정보 조회
  rest.get(`${api}/cafe/menu/:menuId`, (req, res, ctx) => {
    const { menuId } = req.params;

    switch (menuId) {
      case '1':
        return res(ctx.json(jsonMenuDetail));
      default:
        return res(ctx.status(400));
    }
  }),
];
