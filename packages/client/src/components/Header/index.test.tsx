import Layout from '@/Layout';
import { render, screen } from '@testing-library/react';
import Header from '.';

const setup = ({ title }: { title: string }) => {
  const { asFragment } = render(
    <Layout>
      <Header title={title} />
    </Layout>
  );

  return { asFragment };
};

describe('헤더 컴포넌트', () => {
  const title = '주문내역';
  it('요소 존재 여부', () => {
    setup({ title });

    screen.getByText(title);
  });

  it('스냅샷', () => {
    const { asFragment } = setup({ title });

    expect(asFragment()).toMatchSnapshot();
  });
});
