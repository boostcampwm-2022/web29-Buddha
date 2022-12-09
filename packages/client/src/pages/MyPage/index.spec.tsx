import { screen } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup, setupClient } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MenuList', () => {
  it('REQUESTED 상태 컴포넌트 검사', async () => {
    setupClient();
    setup({ url: '/mypage' });
    
    await screen.findByTestId('my-page');
  });
});
