import { screen, fireEvent, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MenuList', () => {
  it('컴포넌트 검사', async () => {
    setup({ url: '/cart' });

    screen.getByTestId('cart-content');
    screen.getByText('주문하기');
  });

  it('메뉴 선택시 메뉴 상세 화면으로 전환', async () => {
    setup({ url: '/cart' });
  });
});
