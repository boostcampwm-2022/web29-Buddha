import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Router from '@/Router';
import Layout from '@/Layout';
import { RecoilRoot } from 'recoil';

export const setup = ({ url }: { url: string }) => {
  const { asFragment } = render(
    <RecoilRoot>
      <Layout>
        <MemoryRouter initialEntries={[url]}>
          <Router />
        </MemoryRouter>
      </Layout>
    </RecoilRoot>
  );

  return { asFragment };
};
