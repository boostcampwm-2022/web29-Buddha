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
  CustomButton,
} from './styled';

function Signup() {
  const [signupType, setSignupType] = useState<string>('customer');
  const [nickname, setNickname] = useState<string>('');
  const [corporate, setCorporate] = useState<string>('');
  const navigate = useNavigate();

  const handleClickCustomer = () => {
    setSignupType('customer');
  };

  const handleClickOwner = () => {
    setSignupType('owner');
  };

  const handleSubmit = () => {
    if (isValidateNickname()) {
      if (signupType === 'owner') {
        if (isValidateCorporate()) {
          try {
            axios
              .post('http://localhost:3000/api/v1/user/signup', {
                type: signupType,
                nickname,
                corporate,
              })
              .then((res) => {
                if (res.status === 201) {
                  navigate('/home');
                }
              });
          } catch (e) {
            console.log(e);
          }
        } else {
          alert('사업자 등록 번호 입력이 잘못됐습니다.');
        }
      } else {
        try {
          axios
            .post('http://localhost:3000/api/v1/user/signup', {
              type: signupType,
              nickname,
            })
            .then((res) => {
              if (res.status === 201) {
                navigate('/home');
              }
            });
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      alert('닉네임 입력이 잘못됐습니다.');
    }
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value.replace(/[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]/g, ''));
  };

  const changeCorporate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorporate(e.target.value.replace(/[^0-9-]/g, ''));
  };

  const isValidateNickname = () => {
    return nickname.length > 2;
  };

  const isValidateCorporate = () => {
    return corporate.length >= 10;
  };

  return (
    <PageWrapper>
      <ChangeForm data-testid={'change-form'}>
        <ChangeButton
          className={signupType === 'customer' ? 'selected' : ''}
          onClick={handleClickCustomer}
        >
          고객
        </ChangeButton>
        <ChangeButton
          className={signupType === 'owner' ? 'selected' : ''}
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
      {signupType === 'owner' ? (
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
      <CustomButton onClick={handleSubmit}>회원가입</CustomButton>
    </PageWrapper>
  );
}

export default Signup;
