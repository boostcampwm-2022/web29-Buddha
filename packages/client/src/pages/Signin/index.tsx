import { Container, Logo, NaverOAuth } from './styled';

function Signin() {
  const storageBaseUrl = process.env.REACT_APP_NCLOUD_STORAGE_BASE_URL;

  const clickedSignin = () => {};

  return (
    <Container>
      <Logo src={`${storageBaseUrl}/logo.png`} alt="로고"></Logo>
      <section title="소개">
        <p>오직 당신만을 위한 카페 주문</p>
        <p>부따 (부스트 다방, Buddha)</p>
      </section>
      <NaverOAuth
        src={`${storageBaseUrl}/naver_oauth_btn.png`}
        alt="네이버 로그인"
        onClick={clickedSignin}
      ></NaverOAuth>
    </Container>
  );
}

export default Signin;
