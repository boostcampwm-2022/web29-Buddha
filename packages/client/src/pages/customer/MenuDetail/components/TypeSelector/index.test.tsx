import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TypeSelector from '.';
import Layout from '@/Layout';
import { Temperature } from '@/types';

const setup = ({ type }: { type: Temperature }) => {
  const handleClickType = jest.fn();
  const { asFragment } = render(
    <Layout>
      <TypeSelector type={type} onClick={handleClickType} />
    </Layout>
  );

  return { asFragment, handleClickType };
};

describe('음료 타입(핫, 아이스) 선택 컴포넌트', () => {
  it('요소 존재 여부', () => {
    setup({ type: 'hot' });

    screen.getByText(/hot/i);
    screen.getByText(/iced/i);
  });

  it('HOT 선택됨', () => {
    setup({ type: 'hot' });

    const btnHot = screen.getByText(/hot/i);
    expect(btnHot).toHaveStyle('background-color: red;');
  });

  it('ICED 선택됨', () => {
    setup({ type: 'iced' });

    const btnIced = screen.getByText(/iced/i);

    expect(btnIced).toHaveStyle('background-color: blue;');
  });

  it('타입 변경 함수 실행', () => {
    const { handleClickType } = setup({ type: 'hot' });

    const btnIced = screen.getByText(/iced/i);
    fireEvent.click(btnIced);

    expect(handleClickType).toBeCalled();
  });

  it('스냅샷', () => {
    const { asFragment } = setup({ type: 'hot' });

    expect(asFragment()).toMatchSnapshot();
  });
});
