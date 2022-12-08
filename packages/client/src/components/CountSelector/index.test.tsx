import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import CountSelector from '.';

import Layout from '@/Layout';

const setup = ({ children }: { children: ReactNode }) => {
  const { asFragment } = render(<Layout>{children}</Layout>);
  return { asFragment };
};

describe('수량 선택 컴포넌트', () => {
  it('요소 존재 여부', () => {
    const handleClickCount = jest.fn();
    setup({ children: <CountSelector count={1} onClick={handleClickCount} /> });

    screen.getByText(/1/);
    screen.getByTestId(/minus/);
    screen.getByTestId(/plus/);
  });

  it('수량 증가 및 감소', async () => {
    const handleClickCount = jest.fn();
    setup({ children: <CountSelector count={1} onClick={handleClickCount} /> });

    const plus = screen.getByTestId(/plus/);
    fireEvent.click(plus);
    fireEvent.click(plus);
    expect(handleClickCount).toHaveBeenCalledTimes(2);
  });

  it('변경 불가 알림', () => {
    const handleClickCount = jest.fn();
    setup({ children: <CountSelector count={1} onClick={handleClickCount} /> });

    Object.defineProperty(window, 'alert', { value: jest.fn() });

    const minus = screen.getByTestId(/minus/);
    fireEvent.click(minus);
  });
});
