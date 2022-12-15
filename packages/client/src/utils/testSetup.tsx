import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { rest } from 'msw';

import Router from '@/Router';
import Layout from '@/Layout';
import UserRoleProvider from '@/UserRoleProvider';
import { server } from '@/mocks/server';
import Toast from '@/components/Toast';

const api = process.env.REACT_APP_API_SERVER_BASE_URL;

export const setup = ({ url }: { url: string }) => {
  const queryClient = new QueryClient();

  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <UserRoleProvider>
          <Layout>
            <MemoryRouter initialEntries={[url]}>
              <Router />
              <Toast />
            </MemoryRouter>
          </Layout>
        </UserRoleProvider>
      </RecoilRoot>
    </QueryClientProvider>
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
