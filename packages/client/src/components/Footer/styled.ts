import styled from '@emotion/styled';

export const FooterWrapper = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
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

  p{
    color: ${(props) => props.theme.colors.tertiary};
  }

  p.selected{
    color: ${(props) => props.theme.colors.primary};
  }
`
