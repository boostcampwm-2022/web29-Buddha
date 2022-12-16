import { fireEvent, screen } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup, setupClient } from 'utils/testSetup';
import { cartData } from '@/mocks/data/cart';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Cart', () => {
  it('장바구니가 비었을 때 컴포넌트 검사 -> 메뉴 리스트 페이지로 이동', async () => {
    setupClient();
    setup({ url: '/cart' });

    await screen.findByTestId('cart-content');
    const menuButton = await screen.findByText('메뉴 담으러 가기');
    await screen.findByText('주문하기');

    setTimeout(async () => {
      fireEvent.click(menuButton);
      await screen.findByTestId('menu-list-page');
    });
  });

  it('장바구니가 있을 때 컴포넌트 검사', async () => {
    setupClient();
    localStorage.setItem('buddhaCart', JSON.stringify(cartData));
    setup({ url: '/cart' });

    await screen.findByTestId('cart-content');
    const cartItems = await screen.findAllByTestId('cart-item');
    expect(cartItems).toHaveLength(1);
    await screen.findByText('주문하기');
  });

  it('+/-/x 버튼검사', async () => {
    setupClient();
    localStorage.setItem('buddhaCart', JSON.stringify(cartData));
    setup({ url: '/cart' });

    const plusButton = await screen.findByTestId('plus');
    const minusButton = await screen.findByTestId('minus');
    const deleteButton = await screen.findByTestId('delete');

    fireEvent.click(plusButton);
    await screen.findByText('담은 상품 3개');

    fireEvent.click(minusButton);
    await screen.findByText('담은 상품 2개');

    fireEvent.click(deleteButton);
    await screen.findByText('메뉴 담으러 가기');

    await screen.findByText('주문하기');
  });

  it('주문하기 동작 검사', async () => {
    setupClient();
    localStorage.setItem('buddhaCart', JSON.stringify(cartData));
    setup({ url: '/cart' });

    const orderButton = await screen.findByText('주문하기');
    fireEvent.click(orderButton);
    await screen.findByText('주문 내역');
  });
});
