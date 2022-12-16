import { fireEvent, screen } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup, setupClient, setupManager } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MenuList', () => {
  it('REQUESTED 상태 컴포넌트 검사', async () => {
    setupClient();
    setup({ url: '/mypage' });

    await screen.findByTestId('my-page');
  });

  it('미구현 토스트 띄우기', async () => {
    setupClient();
    setup({ url: '/mypage' });

    fireEvent.click(await screen.findByText('닉네임 수정'));
    await screen.findByText('미구현 기능입니다');
  });

  it('고객 메뉴 목록 페이지 이동', async () => {
    setupClient();
    setup({ url: '/mypage' });

    fireEvent.click(await screen.findByText('주문하러 가기'));
    await screen.findByTestId('menu-list-page');
  });

  it('업주 주문 요청 목록 페이지 이동', async () => {
    setupManager();
    setup({ url: '/mypage' });

    fireEvent.click(await screen.findByText('주문 받으러 가기'));
    await screen.findByText('주문 요청 내역');
  });
});
