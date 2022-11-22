import { fireEvent, render, screen } from '@testing-library/react';

import OptionSelector from '.';
import Layout from '@/Layout';
import { server } from '@/mocks/server';
import axios from 'axios';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = async () => {
  const { options } = (await axios.get(`${api}/cafe/menu/1`)).data;
  const handleClickOption = jest.fn();

  const { asFragment } = render(
    <Layout>
      <OptionSelector onClick={handleClickOption} options={options} />
    </Layout>
  );

  return { asFragment, handleClickOption };
};

describe('옵션 선택 컴포넌트', () => {
  it('요소 존재 여부', async () => {
    await setup();

    await screen.findByText(/퍼스널 옵션/);
    await screen.findByText(/에스프레소/);
    await screen.findByText(/클래식 시럽/);
  });
});