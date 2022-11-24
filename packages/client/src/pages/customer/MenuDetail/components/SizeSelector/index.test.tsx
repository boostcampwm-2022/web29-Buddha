import Layout from '@/Layout';
import { Size } from '@/types/MenuDetail';
import { fireEvent, render, screen } from '@testing-library/react';
import SizeSelector from '.';

interface Setup {
  size: Size;
}

const setup = ({ size }: Setup) => {
  const handleClickSize = jest.fn();
  const { asFragment } = render(
    <Layout>
      <SizeSelector size={size} onClick={handleClickSize} />
    </Layout>
  );

  return { asFragment, handleClickSize };
};

describe('음료 용량 선택 컴포넌트', () => {
  it('요소 존재 여부', () => {
    setup({ size: 'tall' });

    screen.getByTitle(/tall/);
    screen.getByTitle(/grande/);
    screen.getByTitle(/venti/);
  });

  it('tall 선택됨', () => {
    setup({ size: 'tall' });

    const btnTall = screen.getByTitle(/tall/);
    expect(btnTall).toHaveStyle('border-color: #567F72');
  });

  it('grande 선택됨', () => {
    setup({ size: 'grande' });

    const btnGrande = screen.getByTitle(/grande/);
    expect(btnGrande).toHaveStyle('border-color: #567F72');
  });

  it('용량 변경 함수 실행', () => {
    const { handleClickSize } = setup({ size: 'tall' });

    const btnGrande = screen.getByTitle(/grande/);
    fireEvent.click(btnGrande);

    expect(handleClickSize).toBeCalled();
  });

  it('스냅샷', () => {
    const { asFragment } = setup({ size: 'tall' });

    expect(asFragment()).toMatchSnapshot();
  });
});
