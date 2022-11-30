import { screen, fireEvent, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MenuList', () => {
  it('컴포넌트 검사', async () => {
    setup({ url: '/menu' });

    const menuItems = await screen.findAllByTestId('menu-item');
    expect(menuItems).toHaveLength(3);

    screen.getByTestId('category-bar');
    screen.getByTestId('snack-bar');
  });

  it('메뉴 선택시 메뉴 상세 화면으로 전환', async () => {
    setup({ url: '/menu' });

    const menuItems = await screen.findAllByTestId('menu-item');
    fireEvent.click(menuItems[0]);
    await waitFor(() => {
      screen.getByAltText('음료');
    });
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
