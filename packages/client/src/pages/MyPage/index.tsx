import Header from 'components/Header';
import Footer from 'components/Footer';
import { ButtonWrapper, MyPageWrapper } from './styled';
import { ReactComponent as EditNickname } from 'icons/edit_nickname.svg';
import { ReactComponent as Logout } from 'icons/logout.svg';
import { ReactComponent as Signout } from 'icons/signout.svg';
import Button from '@/components/Button';

function MyPage() {
  return (
    <MyPageWrapper>
      <Header title={'MY'} />
      <p>닉네임 님</p>
      <p>환영합니다!</p>
      <ButtonWrapper>
        <EditNickname/>
        <p>닉네임 수정</p>
      </ButtonWrapper>
      <ButtonWrapper>
        <Logout/>
        <p>로그아웃</p>
      </ButtonWrapper>
      <ButtonWrapper>
        <Signout/>
        <p>회원 탈퇴</p>
      </ButtonWrapper>
      <Button className={'wd-80'}>주문하러 가기</Button>
      <Footer />
    </MyPageWrapper>
  );
}

export default MyPage;
