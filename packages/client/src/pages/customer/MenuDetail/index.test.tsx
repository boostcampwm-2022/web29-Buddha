import { fireEvent, screen } from '@testing-library/react';

import { server } from '@/mocks/server';
import { setup, setupClient } from '@/utils/testSetup';
import { cartData, appendedCartData } from '@/mocks/data/cart';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

const detailSetup = ({ menuId }: { menuId: number }) => {
  setupClient();
  return setup({ url: `/menu/${menuId}` });
};

describe('메뉴 상세 조회 페이지', () => {
  it('요소 존재 여부', async () => {
    detailSetup({ menuId: 1 });

    await screen.findByAltText(/음료/);
    await screen.findByText(/자몽 허니 블랙 티/);
    await screen.findByText(/HOT/);
    await screen.findByText(/Tall/);
    await screen.findByText(/퍼스널 옵션/);
    await screen.findByText(/에스프레소/);
    await screen.findByText(/장바구니 담기/);
  });

  it('조회 실패', async () => {
    detailSetup({ menuId: 2 });
  });

  it('옵션 선택', async () => {
    detailSetup({ menuId: 1 });

    const espresso = await screen.findByDisplayValue('1');
    fireEvent.click(espresso);
    fireEvent.click(espresso);
  });

  it('주문 -> 장바구니 추가 및 페이지 이동', async () => {
    detailSetup({ menuId: 1 });

    const minus = await screen.findByTestId(/minus/);
    const plus = await screen.findByTestId(/plus/);
    const iced = await screen.findByText(/ICED/);
    const grande = await screen.findByText(/Grande/);
    const espresso1 = await screen.findByDisplayValue(1);
    const espresso2 = await screen.findByDisplayValue(2);
    const syrup = await screen.findByDisplayValue(4);
    const order = await screen.findByText(/장바구니 담기/);

    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(minus);
    fireEvent.click(iced);
    fireEvent.click(grande);
    fireEvent.click(espresso1);
    fireEvent.click(espresso2);
    fireEvent.click(syrup);
    fireEvent.click(order);

    const received = JSON.parse(localStorage.getItem('buddhaCart') || '');

    expect(received).toStrictEqual(cartData);
    await screen.findByTestId(/menu-list-page/);
  });

  it('기존 장바구니 + 새로운 메뉴', async () => {
    detailSetup({ menuId: 1 });

    const minus = await screen.findByTestId(/minus/);
    const plus = await screen.findByTestId(/plus/);
    const iced = await screen.findByText(/ICED/);
    const grande = await screen.findByText(/Grande/);
    const espresso1 = await screen.findByDisplayValue(1);
    const espresso2 = await screen.findByDisplayValue(2);
    const syrup = await screen.findByDisplayValue(4);
    const order = await screen.findByText(/장바구니 담기/);

    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(minus);
    fireEvent.click(iced);
    fireEvent.click(grande);
    fireEvent.click(espresso1);
    fireEvent.click(espresso2);
    fireEvent.click(syrup);
    fireEvent.click(order);

    const received = JSON.parse(localStorage.getItem('buddhaCart') || '');
    expect(received).toStrictEqual(appendedCartData);
  });
});
