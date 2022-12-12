import { screen, fireEvent } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup, setupClient, setupManager } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Footer', () => {
  it('(고객) Home 클릭 시 주문 내역 화면으로 전환', async () => {
    setupClient();
    setup({ url: '/' });

    fireEvent.click(await screen.findByText('Home'));
    await screen.findByText('주문 내역');
  });

  it('(고객) Order 클릭 시 메뉴 내역 화면으로 전환', async () => {
    setupClient();
    setup({ url: '/' });

    fireEvent.click(await screen.findByText('Order'));
    await screen.findByTestId('menu-list-page');
  });

  it('(업주) Home 클릭 시 주문 요청 내역 화면으로 전환', async () => {
    setupManager();
    setup({ url: '/' });

    fireEvent.click(await screen.findByText('새 주문'));
    await screen.findByText('주문 요청 내역');
  });

  it('(공통) MY 클릭 시 마이페이지 화면으로 전환', async () => {
    setupClient();
    setup({ url: '/' });

    fireEvent.click(await screen.findByText('MY'));
    await screen.findByTestId('my-page');
  });
});
