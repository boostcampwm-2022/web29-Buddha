import { server } from '@/mocks/server';
import { setup, setupManager } from '@/utils/testSetup';
import { fireEvent, screen } from '@testing-library/react';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('주문수락내역', () => {
  it('요소 존재 여부', async () => {
    setupManager();
    setup({ url: '/manager/accept' });

    await screen.findByText('주문 수락 내역');
    await screen.findByText('현재 주문 상태');
    await screen.findByText('화이트 초콜릿 모카');
  });

  it('주문 상세 정보 조회', async () => {
    setupManager();
    setup({ url: '/manager/accept' });

    const downArrow = await screen.findByText('down_arrow.svg');
    fireEvent.click(downArrow);
    await screen.findByText('화이트 초콜릿 모카 1잔');
    await screen.findByText('에스프레소 샷 추가');
    await screen.findByText('제조 완료');
  });

  it('제조 완료 클릭', async () => {
    setupManager();
    setup({ url: '/manager/accept' });

    const downArrow = await screen.findByText('down_arrow.svg');
    fireEvent.click(downArrow);

    const complete = await screen.findByText('제조 완료');
    fireEvent.click(complete);
  });
});
