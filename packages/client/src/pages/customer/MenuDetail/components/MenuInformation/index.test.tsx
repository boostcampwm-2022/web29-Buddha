import axios from 'axios';
import { render, screen } from '@testing-library/react';

import Layout from '@/Layout';
import { server } from '@/mocks/server';
import MenuDetailContextProvider from '@/stores/MenuDetail';
import MenuInformation from '.';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = async () => {
  const menu = (await axios.get(`${api}/cafe/menu/1`)).data;

  const { asFragment } = render(
    <Layout>
      <MenuDetailContextProvider>
        <MenuInformation menu={menu} />
      </MenuDetailContextProvider>
    </Layout>
  );

  return { asFragment };
};

describe('메뉴 상세 정보 컴포넌트', () => {
  it('요소 존재 여부', async () => {
    await setup();

    await screen.findByText(/자몽 허니 블랙 티/);
    await screen.findByText(/새콤한/);
  });
});
