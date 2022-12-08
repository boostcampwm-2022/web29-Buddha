import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Router from '@/Router';
import Layout from '@/Layout';
import { RecoilRoot } from 'recoil';
import UserRoleProvider from '@/UserRoleProvider';
import { server } from '@/mocks/server';
import { rest } from 'msw';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

export const setup = ({ url }: { url: string }) => {
  const { asFragment } = render(
    <RecoilRoot>
      <UserRoleProvider>
        <Layout>
          <MemoryRouter initialEntries={[url]}>
            <Router />
          </MemoryRouter>
        </Layout>
      </UserRoleProvider>
    </RecoilRoot>
  );

  return { asFragment };
};

export const setupClient = () => {
  server.use(
    rest.get(`${api}/auth`, (req, res, next) => {
      return res(next.json({ role: 'CLIENT' }));
    })
  );
};

export const setupManager = () => {
  server.use(
    rest.get(`${api}/auth`, (req, res, next) => {
      return res(next.json({ role: 'MANAGER' }));
    })
  );
};
