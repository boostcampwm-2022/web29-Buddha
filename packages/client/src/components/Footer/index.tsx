import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FooterWrapper, NavWrapper } from './styled';
import NavigateItem from './NavigateItem';
import { ReactComponent as Home } from 'icons/home.svg';
import { ReactComponent as Order } from 'icons/order.svg';
import { ReactComponent as Mypage } from 'icons/mypage.svg';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>();

  const handleClickHome = (e: React.MouseEvent) => {
    navigate('/home');
  };

  const handleClickOrder = (e: React.MouseEvent) => {
    navigate('/menu');
  };

  const handleClickMY = (e: React.MouseEvent) => {
    navigate('/mypage');
  };

  const findPath = () => {
    if (/home/.test(location.pathname)) setCurrentPath('home');
    else if (/menu|order/.test(location.pathname)) setCurrentPath('order');
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
          <p>Home</p>
        </NavigateItem>

        <NavigateItem
          onClick={handleClickOrder}
          className={currentPath === 'order' ? 'selected' : ''}
        >
          <Order />
          <p>Order</p>
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
