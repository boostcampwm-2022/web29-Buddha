import { screen, fireEvent } from '@testing-library/react';
import { PLACEHOLDER } from '@/constants';
import { server } from '@/mocks/server';
import { setup, setupClient, setupManager } from 'utils/testSetup';

// jest 테스트 수명주기에 따라 server 상태 정의
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const getInputNickname = () => {
  screen.getByText('닉네임');
  const inputNickname = screen.getByPlaceholderText<HTMLInputElement>(
    PLACEHOLDER.nickname
  );
  return { inputNickname };
};

const getInputCorporate = () => {
  screen.getByText('사업자 등록 번호');
  const inputCorporate = screen.getByPlaceholderText<HTMLInputElement>(
    PLACEHOLDER.corporate
  );
  return { inputCorporate };
};

describe('회원가입 페이지', () => {
  it('고객/업주 전환 컴포넌트 존재 여부', () => {
    setup({ url: '/signup' });

    screen.getByTestId('change-form');
  });

  it('고객 가입 입력폼 존재 여부', () => {
    setup({ url: '/signup' });

    getInputNickname();
  });

  it('업주 입력폼으로 전환', () => {
    setup({ url: '/signup' });

    fireEvent.click(screen.getByText('업주'));
    getInputNickname();
    getInputCorporate();
  });

  it('고객 입력 폼으로 전환', () => {
    setup({ url: '/signup' });

    fireEvent.click(screen.getByText('업주'));
    fireEvent.click(screen.getByText('고객'));
    getInputNickname();
    expect(screen.queryByPlaceholderText(PLACEHOLDER.corporate)).toBeNull();
  });

  it('닉네임 입력 (정상)', () => {
    setup({ url: '/signup' });

    const { inputNickname } = getInputNickname();
    fireEvent.change(inputNickname, { target: { value: 'normal nickname3' } });
    expect(inputNickname.value).toBe('normal nickname3');
  });

  it('닉네임 입력 (비정상 - 특수문자 입력)', () => {
    setup({ url: '/signup' });

    const { inputNickname } = getInputNickname();
    fireEvent.change(inputNickname, { target: { value: 'abnormal#$ _1' } });
    expect(inputNickname.value).toBe('abnormal 1');
  });

  it('사업자 등록 번호 입력 (정상)', () => {
    setup({ url: '/signup' });

    fireEvent.click(screen.getByText('업주'));
    const { inputCorporate } = getInputCorporate();
    fireEvent.change(inputCorporate, { target: { value: '123-456-7890' } });
    expect(inputCorporate.value).toBe('123-456-7890');
  });

  it('사업자 등록 번호 입력 (비정상 - 숫자, - 외 입력)', () => {
    setup({ url: '/signup' });

    fireEvent.click(screen.getByText('업주'));
    const { inputCorporate } = getInputCorporate();
    fireEvent.change(inputCorporate, { target: { value: '1a_456-7#90' } });
    expect(inputCorporate.value).toBe('1456-790');
  });

  it('정상 입력 후 가입 버튼을 눌렀을 때 페이지 이동 (고객용)', async () => {
    setupClient();
    setup({ url: '/signup' });

    const { inputNickname } = getInputNickname();
    fireEvent.change(inputNickname, { target: { value: 'normal nickname3' } });
    expect(inputNickname.value).toBe('normal nickname3');

    fireEvent.click(screen.getByText('회원가입'));
    await screen.findByText('주문내역');
  });

  it('정상 입력 후 가입 버튼을 눌렀을 때 페이지 이동 (업주용)', async () => {
    setupManager();
    setup({ url: '/signup' });

    fireEvent.click(screen.getByText('업주'));

    const { inputNickname } = getInputNickname();
    fireEvent.change(inputNickname, { target: { value: 'normal nickname3' } });
    expect(inputNickname.value).toBe('normal nickname3');

    const { inputCorporate } = getInputCorporate();
    fireEvent.change(inputCorporate, { target: { value: '123-456-7890' } });
    expect(inputCorporate.value).toBe('123-456-7890');

    fireEvent.click(screen.getByText('회원가입'));
    await screen.findByText('주문 요청 내역');
  });
});
