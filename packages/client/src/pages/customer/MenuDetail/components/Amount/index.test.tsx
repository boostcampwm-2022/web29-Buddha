import { render, screen } from '@testing-library/react';

import Layout from '@/Layout';
import MenuDetailContextProvider from '@/stores/MenuDetail';
import Amount from '.';

const setup = async () => {
  const { asFragment } = render(
    <Layout>
      <MenuDetailContextProvider>
        <Amount count={1} price={6000} />
      </MenuDetailContextProvider>
    </Layout>
  );

  return { asFragment };
};

describe('메뉴 가격, 수량 선택 컴포넌트', () => {
  it('요소 존재 여부', async () => {
    await setup();

    screen.getByText('1');
    screen.getByText('6,000원');
  });
});
