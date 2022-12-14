import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';

import Button from 'components/Button';

import { PLACEHOLDER } from '@/constants';
import { SignupRequestBody } from '@/types';
import { userRoleState, toastMessageState } from '@/stores';

import {
  PageWrapper,
  ChangeForm,
  ChangeButton,
  InputWrapper,
  InputTitle,
  Input,
} from './styled';

function Signup() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [signupType, setSignupType] = useState<'CLIENT' | 'MANAGER'>('CLIENT');
  const [nickname, setNickname] = useState<string>('');
  const [corporate, setCorporate] = useState<string>('');
  const setUserRole = useSetRecoilState(userRoleState);
  const setToastMessage = useSetRecoilState(toastMessageState);
  const navigate = useNavigate();

  const handleClickCustomer = () => {
    setSignupType('CLIENT');
  };

  const handleClickOwner = () => {
    setSignupType('MANAGER');
  };

  const handleSubmit = async () => {
    if (signupType === 'CLIENT') {
      if (isValidateCustomerForm()) {
        fetchSignup({ userRole: signupType, nickname });
      }
    } else {
      if (isValidateOwnerForm()) {
        fetchSignup({ userRole: signupType, nickname, corporate });
      }
    }
  };

  const fetchSignup = async (data: SignupRequestBody) => {
    try {
      const res = await axios.post(`${api}/auth/signup`, data, {
        withCredentials: true,
      });
      if (res.status === 201) {
        try {
          const res = await axios.get(`${api}/auth`, {
            withCredentials: true,
          });
          setUserRole(res.data.role);
          navigate('/');
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.replace(/[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]/g, ''));
  };

  const changeCorporate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorporate(e.target.value.replace(/[^0-9-]/g, ''));
  };

  const isValidateCustomerForm = () => {
    if (isValidateNickname()) return true;
    return false;
  };

  const isValidateOwnerForm = () => {
    if (isValidateNickname()) {
      if (isValidateCorporate()) return true;
    }
    return false;
  };

  const isValidateNickname = () => {
    if (nickname.length > 2) return true;
    setToastMessage('닉네임 입력이 잘못됐습니다');
    return false;
  };

  const isValidateCorporate = () => {
    if (corporate.length >= 10) return true;
    setToastMessage('사업자 등록 번호 입력이 잘못됐습니다');
    return false;
  };

  return (
    <PageWrapper>
      <ChangeForm data-testid={'change-form'}>
        <ChangeButton
          className={signupType === 'CLIENT' ? 'selected' : ''}
          onClick={handleClickCustomer}
        >
          고객
        </ChangeButton>
        <ChangeButton
          className={signupType === 'MANAGER' ? 'selected' : ''}
          onClick={handleClickOwner}
        >
          업주
        </ChangeButton>
      </ChangeForm>
      <InputWrapper>
        <InputTitle>닉네임</InputTitle>
        <Input
          onChange={changeNickname}
          type={'text'}
          placeholder={PLACEHOLDER.nickname}
          maxLength={20}
          value={nickname}
        />
      </InputWrapper>
      {signupType === 'MANAGER' ? (
        <InputWrapper>
          <InputTitle>사업자 등록 번호</InputTitle>
          <Input
            onChange={changeCorporate}
            type={'text'}
            placeholder={PLACEHOLDER.corporate}
            maxLength={12}
            value={corporate}
          />
        </InputWrapper>
      ) : (
        <></>
      )}
      <Button onClick={handleSubmit} className={'wd-80'}>
        회원가입
      </Button>
    </PageWrapper>
  );
}

export default Signup;
