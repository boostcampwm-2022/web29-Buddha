import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
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
    <RecoilRoot>
      <Layout>
        <MemoryRouter initialEntries={[url]}>
          <Router />
        </MemoryRouter>
      </Layout>
    </RecoilRoot>
  );
};

describe('MenuList', () => {
  it('컴포넌트 검사', async () => {
    setup({ url: '/menu' });

    const menuItems = await screen.findAllByTestId('menu-item');
    expect(menuItems).toHaveLength(3);
  });

  it('메뉴 선택시 메뉴 상세 화면으로 전환', async () => {
    setup({ url: '/menu' });

    const menuItems = await screen.findAllByTestId('menu-item');
    fireEvent.click(menuItems[0]);
  });

  it('장바구니 클릭시 장바구니 화면으로 전환', async () => {
    setup({ url: '/menu' });
  });

  it('Footer Home 클릭 시 주문내역 화면으로 전환', async () => {
    setup({ url: '/menu' });
  });

  it('Footer MY 클릭 시 마이페이지 화면으로 전환', async () => {
    setup({ url: '/menu' });
  });
});
