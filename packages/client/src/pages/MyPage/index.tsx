import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Button from 'components/Button';

import { userRoleState } from '@/stores';
import useFetch from '@/hooks/useFetch';

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

function MyPage() {
  const userRole = useRecoilValue(userRoleState);
  const navigate = useNavigate();

  const { jsonData: user } = useFetch({ url: '/user', method: 'GET' });

  const handleClickButton = () => {
    if (userRole === 'CLIENT') navigate('/menu');
    else navigate('/');
  };

  const handleClickDefault = () => {
    alert('미구현 기능입니다');
  };

  return (
    <MyPageWrapper data-testid={'my-page'}>
      <Header title={'MY'} />
      <ContentWrapper>
        <MyPageTitleWrapper>
          <span>
            <p className={'nickname'}>{user.nickname ?? '닉네임'}</p>
            <p>님</p>
          </span>
          <p>환영합니다!</p>
        </MyPageTitleWrapper>
        <CenterWrapper>
          <ButtonWrapper onClick={handleClickDefault}>
            <EditNickname />
            <p>닉네임 수정</p>
          </ButtonWrapper>
          <ButtonWrapper onClick={handleClickDefault}>
            <Signout />
            <p>로그아웃</p>
          </ButtonWrapper>
          <ButtonWrapper onClick={handleClickDefault}>
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
