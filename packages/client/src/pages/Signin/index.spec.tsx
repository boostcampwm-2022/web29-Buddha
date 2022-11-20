import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '@/Router';
import Layout from '@/Layout';

const setup = () => {
  render(
    <Layout>
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>
    </Layout>
  );
};

describe('Signin', () => {
  it('Has Elements', () => {
    setup();

    screen.getByAltText('로고');
    screen.getByAltText('네이버 로그인');
    const description = screen.getAllByTitle('소개');

    expect(description).toHaveLength(1);
  });
});
