import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Layout from '@/Layout';
import Router from '@/Router';
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = ({ menuId }: { menuId: number }) => {
  const { asFragment } = render(
    <Layout>
      <MemoryRouter initialEntries={[`/menu/${menuId}`]}>
        <Router />
      </MemoryRouter>
    </Layout>
  );

  return { asFragment };
};

describe('메뉴 상세 조회 페이지', () => {
  it('요소 존재 여부', async () => {
    setup({ menuId: 1 });

    screen.getByText(/loading/i);
    await screen.findByAltText(/음료/);
    await screen.findByText(/자몽 허니 블랙 티/);
    await screen.findByText(/HOT/);
    await screen.findByText(/Tall/);
    await screen.findByText(/퍼스널 옵션/);
    await screen.findByText(/주문하기/);
  });

  it('조회 실패', async () => {
    setup({ menuId: 2 });

    Object.defineProperty(window, 'alert', { value: jest.fn() });
    await screen.findByText(/조회 오류/);
  });
});
