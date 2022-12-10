import { screen } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup, setupClient } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Cart', () => {
  it('컴포넌트 검사', async () => {
    setupClient();
    setup({ url: '/cart' });

    await screen.findByTestId('cart-content');
    await screen.findByText('주문하기');
  });
});
