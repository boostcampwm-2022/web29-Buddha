import { render, screen } from '@testing-library/react';
import TemperatureSelector from '.';
import Layout from '@/Layout';
import { Temperature } from '@/types';

const setup = ({ temperature }: { temperature: Temperature }) => {
  const { asFragment } = render(
    <Layout>
      <TemperatureSelector temperature={temperature} />
    </Layout>
  );

  return { asFragment };
};

describe('음료 타입(핫, 아이스) 선택 컴포넌트', () => {
  it('요소 존재 여부', () => {
    setup({ temperature: 'hot' });

    screen.getByText(/hot/i);
    screen.getByText(/iced/i);
  });

  it('HOT 선택됨', () => {
    setup({ temperature: 'hot' });

    const btnHot = screen.getByText(/hot/i);
    expect(btnHot).toHaveStyle('background-color: red;');
  });

  it('ICED 선택됨', () => {
    setup({ temperature: 'iced' });

    const btnIced = screen.getByText(/iced/i);

    expect(btnIced).toHaveStyle('background-color: blue;');
  });

  // it('타입 변경 함수 실행', () => {
  //   const { handleClickType } = setup({ type: 'hot' });

  //   const btnIced = screen.getByText(/iced/i);
  //   fireEvent.click(btnIced);

  //   expect(handleClickType).toBeCalled();
  // });

  it('스냅샷', () => {
    const { asFragment } = setup({ temperature: 'hot' });

    expect(asFragment()).toMatchSnapshot();
  });
});
