import { render, screen } from '@testing-library/react';
import Signin from './index';
import Layout from '@/Layout';

describe('Signin', () => {
  it('Has Elements', () => {
    render(
      <Layout>
        <Signin />
      </Layout>
    );

    screen.getByAltText('로고');
    screen.getByAltText('네이버 로그인');
    const description = screen.getAllByTitle('소개');

    expect(description).toHaveLength(1);
  });
});
