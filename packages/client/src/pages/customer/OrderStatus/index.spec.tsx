import { screen } from '@testing-library/react';
import { server } from '@/mocks/server';
import { setup, setupClient } from 'utils/testSetup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MenuList', () => {
  it('REQUESTED 상태 컴포넌트 검사', async () => {
    setupClient();
    setup({ url: '/order/1' });
    
    await screen.findByTestId('status-bar');
    await screen.findByTestId('REQUESTED');
  });

  it('ACCEPTED 상태 컴포넌트 검사', async () => {
    setupClient();
    setup({ url: '/order/2' });
    
    await screen.findByTestId('status-bar');
    await screen.findByTestId('ACCEPTED');
  });

  it('COMPLETED 상태 컴포넌트 검사', async () => {
    setupClient();
    setup({ url: '/order/3' });
    
    await screen.findByTestId('status-bar');
    await screen.findByTestId('COMPLETED');
  });
});
