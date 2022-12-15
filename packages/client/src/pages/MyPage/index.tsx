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
import { useRecoilValue } from 'recoil';
import { userRoleState } from '@/stores';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const userRole = useRecoilValue(userRoleState);
  const navigate = useNavigate();

  const handleClickButton = () => {
    if (userRole === 'CLIENT') navigate('/menu');
    else navigate('/');
  };

  return (
    <MyPageWrapper data-testid={'my-page'}>
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
        <Button onClick={handleClickButton} className={'wd-80'}>
          {userRole === 'CLIENT' ? '주문하러 가기' : '주문 받으러 가기'}
        </Button>
      </ContentWrapper>
      <Footer />
    </MyPageWrapper>
  );
}

export default MyPage;
