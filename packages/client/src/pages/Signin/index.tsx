import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios, { AxiosError } from 'axios';

import { ChkUser } from '@/types';
import { userRoleState } from '@/stores';
import Button from '@/components/Button';
import { customFetch } from '@/utils/fetch';

import {
  Container,
  Logo,
  NaverOAuth,
  TempInput,
  TempSigninContainer,
} from './styled';

function Signin() {
  const storageUrl = process.env.REACT_APP_NCLOUD_STORAGE_BASE_URL;
  const naverOAuthURL = process.env.REACT_APP_NAVER_OAUTH_URL;
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;

  const [camperId, setCamperId] = useState('');
  const [searchParams] = useSearchParams();
  const setUserRole = useSetRecoilState(userRoleState);
  const navigate = useNavigate();

  /**
   * 네이버 OAuth 로그인 버튼 클릭 시, 실행되는 함수
   *
   * 네이버 로그인을 위한 링크로 이동
   */
  const handleClickOAuth = useCallback(() => {
    if (!naverOAuthURL) return;

    window.location.assign(naverOAuthURL);
  }, [naverOAuthURL]);

  const handleClickCamperLogin = async () => {
    try {
      const res = await customFetch({
        url: `/auth/mock-signin`,
        method: 'post',
        data: { name: camperId },
      });
      if (res.status === 201) {
        try {
          const res = await customFetch({
            url: `/auth`,
            method: 'get',
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

  /**
   * 네이버 OAuth 리다이렉트 받은 이후 가입 여부 확인
   *
   * 서버 응답에 따라 페이지 라우팅
   *
   * @params { code, state }: OAuth 리다이렉트 응답 받은 쿼리
   */
  const chkUser = useCallback(
    async ({ code, state }: ChkUser) => {
      window.history.replaceState(null, '', '/');

      try {
        const res = await axios.get(
          `${api}/auth/naver-oauth?code=${code}&state=${state}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
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
        const axiosError = err instanceof AxiosError;

        if (axiosError && err.response?.status === 303) navigate('/signup');
        else navigate('/');
      }
    },
    [api, navigate, setUserRole]
  );

  /**
   * 메인 페이지 접속 시, 쿼리 존재 여부 판단
   *
   * 네이버 OAuth 리다이렉트를 받아 쿼리 존재하면 가입여부 확인 진행
   */
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (code && state) {
    chkUser({ code, state });
    return <p>...loading</p>;
  }

  return (
    <Container>
      <Logo src={`${storageUrl}/logo.png`} alt="로고"></Logo>
      <section title="소개">
        <p>오직 당신만을 위한 카페 주문</p>
        <p>부따 (부스트 다방, Buddha)</p>
      </section>
      <NaverOAuth
        src={`${storageUrl}/naver_oauth_btn.png`}
        alt="네이버 로그인"
        onClick={handleClickOAuth}
      ></NaverOAuth>
      <TempSigninContainer>
        <p>캠퍼 로그인</p>
        <TempInput
          type="text"
          value={camperId}
          onChange={(e) => setCamperId(e.currentTarget.value)}
          maxLength={4}
          placeholder="대소문자 유의 ex)J117"
        />
        <Button onClick={handleClickCamperLogin}>로그인</Button>
      </TempSigninContainer>
    </Container>
  );
}

export default Signin;
