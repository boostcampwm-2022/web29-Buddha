import { render, screen } from '@testing-library/react';

import OptionSelector from '.';
import Layout from '@/Layout';
import { server } from '@/mocks/server';
import axios from 'axios';
import MenuDetailContextProvider from '@/stores/MenuDetail';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = async () => {
  const { options } = (await axios.get(`${api}/cafe/menu/1`)).data;

  const { asFragment } = render(
    <Layout>
      <MenuDetailContextProvider>
        <OptionSelector options={options} />
      </MenuDetailContextProvider>
    </Layout>
  );

  return { asFragment };
};

describe('옵션 선택 컴포넌트', () => {
  it('요소 존재 여부', async () => {
    await setup();

    await screen.findByText(/퍼스널 옵션/);
    await screen.findByText(/에스프레소/);
    await screen.findByText(/클래식 시럽/);
  });
});
