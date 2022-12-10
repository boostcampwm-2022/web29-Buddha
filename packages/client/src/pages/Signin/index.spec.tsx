import { fireEvent, screen } from '@testing-library/react';

import { server } from '@/mocks/server';
import { PLACEHOLDER } from '@/constants';
import { setup, setupClient } from 'utils/testSetup';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('로그인 페이지', () => {
  it('로고, 버튼 요소 존재 여부', () => {
    setup({ url: '/' });

    screen.getByAltText('로고');
    screen.getByAltText('네이버 로그인');
    const description = screen.getAllByTitle('소개');

    expect(description.length).toBeGreaterThanOrEqual(1);
  });

  it('네이버 OAuth 로그인 버튼 클릭', () => {
    setup({ url: '/' });

    /**
     * Stack overflow
     * https://stackoverflow.com/questions/54090231/how-to-fix-error-not-implemented-navigation-except-hash-changes
     *
     * https://github.com/jsdom/jsdom/issues/2112
     * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
     */
    Object.defineProperty(window, 'location', {
      value: { assign: jest.fn() },
    });
    const btnSignin = screen.getByAltText('네이버 로그인');

    fireEvent.click(btnSignin);
    window.location.search = '?code=asdwfwqd134caw&state=1234';

    expect(window.location.search).toEqual(expect.stringContaining('?code='));
    expect(window.location.search).toEqual(expect.stringContaining('&state='));
  });

  it('네이버 OAuth 로그인 리다이렉트', () => {
    setup({ url: '/?code=qwer1234&state=1234' });

    const logo = screen.queryByAltText('로고');
    const btnSignin = screen.queryByAltText('네이버 로그인');
    const description = screen.queryAllByTitle('소개');

    expect(logo).toBeNull();
    expect(btnSignin).toBeNull();
    expect(description).toHaveLength(0);
  });

  it('미가입 유저 => 회원가입 페이지 이동', async () => {
    setup({ url: '/?code=qwer1234&state=1234' });

    await screen.findByText('고객');
    await screen.findByText('업주');
    await screen.findByPlaceholderText(PLACEHOLDER.nickname);
    await screen.findByText('회원가입');
  });

  it('가입 유저 => 고객 주문 내역 페이지 이동', async () => {
    setupClient();
    setup({ url: '/?code=qwer1234&state=1234' });

    Object.defineProperty(window.document, 'cookie', {
      value: 'name=이름;email=test@test.com',
    });

    await screen.findByText(/주문내역/i);
  });

  it('스냡샷', () => {
    const { asFragment } = setup({ url: '/' });

    expect(asFragment()).toMatchSnapshot();
  });
});
