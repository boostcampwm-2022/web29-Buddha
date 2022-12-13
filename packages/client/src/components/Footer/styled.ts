import styled from '@emotion/styled';
import { ReactComponent as HomeSVG } from 'icons/home.svg';
import { ReactComponent as OrderSVG } from 'icons/order.svg';
import { ReactComponent as MypageSVG } from 'icons/mypage.svg';

export const FooterWrapper = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  height: 3rem;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const NavItem = styled.div`
  text-align: center;

  p {
    color: ${(props) => props.theme.colors.tertiary};
    font-size: ${(props) => props.theme.font.size.xs};
  }

  path {
    fill: ${(props) => props.theme.colors.tertiary};
  }

  &.selected {
    p {
      color: ${(props) => props.theme.colors.primary};
    }

    path {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const Home = styled(HomeSVG)`
  width: 1rem;
  height: 1rem;
`;

export const Order = styled(OrderSVG)`
  width: 1rem;
  height: 1rem;
`;

export const Mypage = styled(MypageSVG)`
  width: 1rem;
  height: 1rem;
`;
