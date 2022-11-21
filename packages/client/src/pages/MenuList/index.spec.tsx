import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import Router from '@/Router';
import Layout from '@/Layout';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

const server = setupServer(
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
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = ({ url }: { url: string }) => {
  render(
    <Layout>
      <MemoryRouter initialEntries={[url]}>
        <Router />
      </MemoryRouter>
    </Layout>
  );
};

describe('MenuList', () => {
  it('컴포넌트 검사', async () => {
    setup({ url: '/menu' });

    screen.getByAltText('메뉴 이미지');
    screen.getByText('카페 아메리카노');
    screen.getByText('1000');
  });
});
