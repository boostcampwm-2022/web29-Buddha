import axios, { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Logo, NaverOAuth } from './styled';

function Signin() {
  const storageUrl = process.env.REACT_APP_NCLOUD_STORAGE_BASE_URL;
  const naverOAuthURL = process.env.REACT_APP_NAVER_OAUTH_URL;
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClickOAuth = useCallback(() => {
    if (!naverOAuthURL) return;

    window.location.assign(naverOAuthURL);
  }, [naverOAuthURL]);

  /**
   * 메인 페이지 접속 시, 쿼리스트링 여부 판단
   *
   * 쿼리 스트링 존재하면 로그인 진행중
   */
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) return;

    axios
      .get(`${api}/user/naver-oauth?code=${code}&state=${state}`)
      .then((res) => {
        navigate('/home');
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 303) navigate('/signup');
        else navigate('/');
      });
  }, [searchParams, navigate, api]);

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
    </Container>
  );
}

export default Signin;
