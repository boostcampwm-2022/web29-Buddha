import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './index';
import Layout from '../../Layout';
import { PLACEHOLDER } from '../../constants';

const setup = () => {
  render(
    <Layout>
      <Signup></Signup>
    </Layout>
  );
};

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
    setup();

    screen.getByTestId('change-form');
  });

  it('고객 가입 입력폼 존재 여부', () => {
    setup();

    getInputNickname();
  });

  it('업주 입력폼으로 전환', () => {
    setup();

    fireEvent.click(screen.getByText('업주'));
    getInputNickname();
    getInputCorporate();
  });

  it('고객 입력 폼으로 전환', () => {
    setup();

    fireEvent.click(screen.getByText('업주'));
    fireEvent.click(screen.getByText('고객'));
    getInputNickname();
    expect(screen.queryByPlaceholderText(PLACEHOLDER.corporate)).toBeNull();
  });

  it('닉네임 입력 (정상)', () => {
    setup();

    const { inputNickname } = getInputNickname();
    fireEvent.change(inputNickname, { target: { value: 'normal nickname3' } });
    expect(inputNickname.value).toBe('normal nickname3');
  });

  it('닉네임 입력 (비정상 - 특수문자 입력)', () => {
    setup();

    const { inputNickname } = getInputNickname();
    fireEvent.change(inputNickname, { target: { value: 'abnormal#$ _1' } });
    expect(inputNickname.value).toBe('abnormal 1');
  });

  it('사업자 등록 번호 입력 (정상)', () => {
    setup();

    fireEvent.click(screen.getByText('업주'));
    const { inputCorporate } = getInputCorporate();
    fireEvent.change(inputCorporate, { target: { value: '123-456-7890' } });
    expect(inputCorporate.value).toBe('123-456-7890');
  });

  it('사업자 등록 번호 입력 (비정상 - 숫자, - 외 입력)', () => {
    setup();

    fireEvent.click(screen.getByText('업주'));
    const { inputCorporate } = getInputCorporate();
    fireEvent.change(inputCorporate, { target: { value: '1a_456-7#90' } });
    expect(inputCorporate.value).toBe('1456-790');
  });

  it('정상 입력 후 가입 버튼을 눌렀을 때 (고객용)', () => {
    setup();

    const { inputNickname } = getInputNickname();
    fireEvent.change(inputNickname, { target: { value: 'normal nickname3' } });
    expect(inputNickname.value).toBe('normal nickname3');
  });

  it('정상 입력 후 가입 버튼을 눌렀을 때 (업주용)', () => {
    setup();

    fireEvent.click(screen.getByText('업주'));

    const { inputNickname } = getInputNickname();
    fireEvent.change(inputNickname, { target: { value: 'normal nickname3' } });
    expect(inputNickname.value).toBe('normal nickname3');

    const { inputCorporate } = getInputCorporate();
    fireEvent.change(inputCorporate, { target: { value: '123-456-7890' } });
    expect(inputCorporate.value).toBe('123-456-7890');
  });
});

export {};
