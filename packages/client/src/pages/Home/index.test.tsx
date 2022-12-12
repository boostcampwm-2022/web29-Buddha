import { server } from '@/mocks/server';
import { setup, setupClient, setupManager } from '@/utils/testSetup';
import { fireEvent, screen } from '@testing-library/react';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('주문 내역 페이지', () => {
  describe('고객', () => {
    it('요소 존재 여부', async () => {
      setupClient();
      setup({ url: '/' });

      await screen.findByText('주문 내역');
      await screen.findByText('아메리카노 외 1개');
      await screen.findByText('아메리카노');
      await screen.findByText('카페라떼');
    });

    it('메뉴 상세 정보 요소 존재 여부', async () => {
      setupClient();
      setup({ url: '/' });

      const downArrow = await screen.findAllByText('down_arrow.svg');
      const firstDownArrow = downArrow[0];

      fireEvent.click(firstDownArrow);
      await screen.findByText('화이트 초콜릿 모카 1잔');
      await screen.findByText('에스프레소 샷 추가');
    });

    it('주문 상태 조회 클릭', async () => {
      setupClient();
      setup({ url: '/' });

      const overviewTitle = await screen.findAllByTestId(
        'order-overview-title'
      );
      expect(overviewTitle).toHaveLength(5);
      fireEvent.click(overviewTitle[1]);
    });
  });

  describe('업주', () => {
    it('요소 존재 여부', async () => {
      setupManager();
      setup({ url: '/' });

      await screen.findByText('주문 요청 내역');
      await screen.findByText('현재 주문 상태');
      await screen.findByText('화이트 초콜릿 모카');
    });

    it('메뉴 상세 정보 요소 존재 여부', async () => {
      setupManager();
      setup({ url: '/' });

      const downArrow = await screen.findAllByText('down_arrow.svg');
      const firstDownArrow = downArrow[0];

      fireEvent.click(firstDownArrow);
      await screen.findByText('화이트 초콜릿 모카 1잔');
      await screen.findByText('에스프레소 샷 추가');
      await screen.findByText('수락');
      await screen.findByText('거절');
    });

    it('수락', async () => {
      setupManager();
      setup({ url: '/' });

      const downArrow = await screen.findAllByText('down_arrow.svg');
      const firstDownArrow = downArrow[0];

      fireEvent.click(firstDownArrow);
      await screen.findByText('화이트 초콜릿 모카 1잔');
      await screen.findByText('에스프레소 샷 추가');
      const accept = await screen.findByText('수락');

      fireEvent.click(accept);
    });

    it('거절', async () => {
      setupManager();
      setup({ url: '/' });

      const downArrow = await screen.findAllByText('down_arrow.svg');
      const firstDownArrow = downArrow[0];

      fireEvent.click(firstDownArrow);
      await screen.findByText('화이트 초콜릿 모카 1잔');
      await screen.findByText('에스프레소 샷 추가');
      const reject = await screen.findByText('거절');

      fireEvent.click(reject);
    });
  });
});
