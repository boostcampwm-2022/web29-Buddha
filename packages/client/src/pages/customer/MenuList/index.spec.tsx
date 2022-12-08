import { screen, fireEvent, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup, setupClient } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MenuList', () => {
  it('컴포넌트 검사', async () => {
    setupClient();
    setup({ url: '/menu' });

    const menuItems = await screen.findAllByTestId('menu-item');
    expect(menuItems).toHaveLength(3);

    screen.getByTestId('category-bar');
    screen.getByTestId('snack-bar');
  });

  it('카테고리 클릭시 카테고리 전환', async () => {
    setupClient();
    setup({ url: '/menu' });

    fireEvent.click(await screen.findByText('콜드 브루'));
    await waitFor(async () => {
      const menuItems = await screen.findAllByTestId('menu-item');
      expect(menuItems).toHaveLength(2);
    });
  });

  it('메뉴 선택시 메뉴 상세 화면으로 전환', async () => {
    setupClient();
    setup({ url: '/menu' });

    const menuItems = await screen.findAllByTestId('menu-item');
    fireEvent.click(menuItems[0]);
    await screen.findByTestId('menu-detail-page');
  });

  it('장바구니 클릭시 장바구니 화면으로 전환', async () => {
    setupClient();
    setup({ url: '/menu' });

    fireEvent.click(await screen.findByTestId('cart-button'));
    await screen.findByText('장바구니');
  });
});
