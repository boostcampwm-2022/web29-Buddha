import Header from 'components/Header';
import Footer from 'components/Footer';
import {
  ButtonWrapper,
  MyPageWrapper,
  ContentWrapper,
  MyPageTitleWrapper,
  EditNickname,
  Signout,
  Withdrawal,
  CenterWrapper,
} from './styled';
import Button from '@/components/Button';

function MyPage() {
  return (
    <MyPageWrapper>
      <Header title={'MY'} />
      <ContentWrapper>
        <MyPageTitleWrapper>
          <span>
            <p className={'nickname'}>닉네임</p>
            <p>님</p>
          </span>
          <p>환영합니다!</p>
        </MyPageTitleWrapper>
        <CenterWrapper>
          <ButtonWrapper>
            <EditNickname />
            <p>닉네임 수정</p>
          </ButtonWrapper>
          <ButtonWrapper>
            <Signout />
            <p>로그아웃</p>
          </ButtonWrapper>
          <ButtonWrapper>
            <Withdrawal />
            <p>회원 탈퇴</p>
          </ButtonWrapper>
        </CenterWrapper>
        <Button className={'wd-80'}>주문하러 가기</Button>
        <Footer />
      </ContentWrapper>
    </MyPageWrapper>
  );
}

export default MyPage;
