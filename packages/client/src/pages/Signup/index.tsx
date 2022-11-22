import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLACEHOLDER } from '@/constants';
import {
  PageWrapper,
  ChangeForm,
  ChangeButton,
  InputWrapper,
  InputTitle,
  Input,
} from './styled';
import { SignupRequestBody } from 'types/Signup';
import Button from 'components/Button';

function Signup() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  //userType -> 고객인 경우 0, 업주인 경우 1
  const [userType, setuserType] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [corporate, setCorporate] = useState<string>('');
  const navigate = useNavigate();

  const handleClickCustomer = () => {
    setuserType(0);
  };

  const handleClickOwner = () => {
    setuserType(1);
  };

  const handleSubmit = async () => {
    if (!userType) {
      if (isValidateCustomerForm()) {
        fetchSignup({ userType, nickname });
      }
    } else {
      if (isValidateOwnerForm()) {
        fetchSignup({ userType, nickname, corporate });
      }
    }
  };

  const fetchSignup = async (data: SignupRequestBody) => {
    try {
      const res = await axios.post(`${api}/user/signup`, data, {
        withCredentials: true,
      });
      if (res.status === 201) {
        navigate('/home');
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
    alert('닉네임 입력이 잘못됐습니다');
    return false;
  };

  const isValidateCorporate = () => {
    if (corporate.length >= 10) return true;
    alert('사업자 등록 번호 입력이 잘못됐습니다');
    return false;
  };

  return (
    <PageWrapper>
      <ChangeForm data-testid={'change-form'}>
        <ChangeButton
          className={!userType ? 'selected' : ''}
          onClick={handleClickCustomer}
        >
          고객
        </ChangeButton>
        <ChangeButton
          className={userType ? 'selected' : ''}
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
      {userType ? (
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
