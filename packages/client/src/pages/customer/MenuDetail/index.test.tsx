import { fireEvent, render, screen } from '@testing-library/react';
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
    await screen.findByText(/에스프레소/);
    await screen.findByText(/장바구니 담기/);
  });

  it('조회 실패', async () => {
    setup({ menuId: 2 });

    Object.defineProperty(window, 'alert', { value: jest.fn() });
    await screen.findByText(/조회 오류/);
  });

  it('주문 -> 장바구니 추가 및 페이지 이동', async () => {
    setup({ menuId: 1 });

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
    const expected = [
      {
        id: 1,
        name: '자몽 허니 블랙 티',
        type: 'iced',
        size: 'grande',
        count: 2,
        thumbnail:
          'https://www.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000187]_20210419131229539.jpg',
        price: 7700,
        options: [
          { id: 2, name: '2', price: 1000, category: '에스프레소 샷' },
          { id: 4, name: '1', price: 500, category: '클래식 시럽' },
        ],
      },
    ];

    expect(received).toStrictEqual(expected);
    await screen.findByTestId(/menu-list-page/);
  });
});
