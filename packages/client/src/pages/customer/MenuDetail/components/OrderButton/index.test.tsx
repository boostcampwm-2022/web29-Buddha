import { render, screen } from '@testing-library/react';

import Layout from '@/Layout';
import { server } from '@/mocks/server';
import MenuDetailContextProvider from '@/stores/MenuDetail';
import OrderButton from '.';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = async () => {
  const { asFragment } = render(
    <Layout>
      <MemoryRouter>
        <MenuDetailContextProvider>
          <OrderButton />
        </MenuDetailContextProvider>
      </MemoryRouter>
    </Layout>
  );

  return { asFragment };
};

describe('메뉴 주문 버튼 컴포넌트', () => {
  it('요소 존재 여부', async () => {
    await setup();

    screen.getByText(/장바구니 담기/);
  });
});
