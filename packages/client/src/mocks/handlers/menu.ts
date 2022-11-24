import { rest } from 'msw';
import { menuDetailData, menuListData } from '@/mocks/data/menu';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

export const menuHandlers = [
  rest.get(`${api}/cafe/1/menus`, (req, res, next) => {
    return res(next.json(menuListData));
  }),
  // 메뉴 상세 정보 조회
  rest.get(`${api}/cafe/menu/:menuId`, (req, res, next) => {
    const { menuId } = req.params;

    switch (menuId) {
      case '1':
        return res(next.json(menuDetailData));
      default:
        return res(next.status(400));
    }
  }),
];
