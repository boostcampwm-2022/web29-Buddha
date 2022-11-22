import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FooterWrapper, NavWrapper } from './styled';

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
        <p
          className={currentPath === 'home' ? 'selected' : ''}
          onClick={handleClickHome}
        >
          Home
        </p>
        <p
          className={currentPath === 'order' ? 'selected' : ''}
          onClick={handleClickOrder}
        >
          Order
        </p>
        <p
          className={currentPath === 'mypage' ? 'selected' : ''}
          onClick={handleClickMY}
        >
          MY
        </p>
      </NavWrapper>
    </FooterWrapper>
  );
}

export default Footer;