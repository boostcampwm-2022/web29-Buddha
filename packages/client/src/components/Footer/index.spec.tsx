import { screen, fireEvent, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Footer', () => {
  it('Home 클릭 시 주문내역 화면으로 전환', async () => {
    setup({ url: '/home' });

    fireEvent.click(screen.getByText('Home'));
    await waitFor(() => {
      screen.getByText('주문내역');
    });
  });

  it('Order 클릭 시 메뉴 내역 화면으로 전환', async () => {
    setup({ url: '/home' });

    fireEvent.click(screen.getByText('Order'));
    await waitFor(() => {
      screen.getByText('Order');
    });
  });

  it('MY 클릭 시 마이페이지 화면으로 전환', async () => {
    setup({ url: '/home' });

    fireEvent.click(screen.getByText('MY'));
    await waitFor(() => {
      screen.getByText('MY');
    });
  });
});
