import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FooterWrapper, NavWrapper, Home, Order, Mypage } from './styled';
import NavigateItem from './NavigateItem';
// import { ReactComponent as Home } from 'icons/home.svg';
// import { ReactComponent as Order } from 'icons/order.svg';
// import { ReactComponent as Mypage } from 'icons/mypage.svg';
import { useRecoilValue } from 'recoil';
import { userRoleState } from '@/stores';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>();
  const userRole = useRecoilValue(userRoleState);

  const handleClickHome = (e: React.MouseEvent) => {
    navigate('/');
  };

  const handleClickOrder = (e: React.MouseEvent) => {
    navigate(userRole === 'CLIENT' ? '/menu' : '/manager/accept');
  };

  const handleClickMY = (e: React.MouseEvent) => {
    navigate('/mypage');
  };

  const findPath = () => {
    if (/\/$|order/.test(location.pathname)) setCurrentPath('home');
    else if (/menu|manager/.test(location.pathname)) setCurrentPath('order');
    else if (/mypage/.test(location.pathname)) setCurrentPath('mypage');
  };

  useEffect(() => {
    findPath();
  }, []);

  return (
    <FooterWrapper>
      <NavWrapper>
        <NavigateItem
          onClick={handleClickHome}
          className={currentPath === 'home' ? 'selected' : ''}
        >
          <Home />
          <p>{userRole === 'CLIENT' ? 'Home' : '새 주문'}</p>
        </NavigateItem>

        <NavigateItem
          onClick={handleClickOrder}
          className={currentPath === 'order' ? 'selected' : ''}
        >
          <Order />
          <p>{userRole === 'CLIENT' ? 'Order' : '진행중'}</p>
        </NavigateItem>

        <NavigateItem
          onClick={handleClickMY}
          className={currentPath === 'mypage' ? 'selected' : ''}
        >
          <Mypage />
          <p>MY</p>
        </NavigateItem>
      </NavWrapper>
    </FooterWrapper>
  );
}

export default Footer;
