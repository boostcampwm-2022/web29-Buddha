function Signin() {
  const storageBaseUrl = process.env.REACT_APP_NCLOUD_STORAGE_BASE_URL;

  const clickedSignin = () => {
    alert('로그인 요청');
  };

  return (
    <>
      <img
        src={`${storageBaseUrl}/logo.png`}
        alt="로고"
        style={{ width: '60%', borderRadius: '50%' }}
      ></img>
      <p>오직 당신만을 위한 카페 주문</p>
      <p>부따 (부스트 다방, Buddha)</p>
      <img
        src={`${storageBaseUrl}/naver_oauth_btn.png`}
        alt="로그인"
        onClick={clickedSignin}
        style={{ width: '60%' }}
      ></img>
    </>
  );
}

export default Signin;
