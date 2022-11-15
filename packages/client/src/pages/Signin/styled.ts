import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  & p {
    margin: 15px 0;
  }
`;

export const Logo = styled.img`
  width: 60%;
  border-radius: ${(props) => props.theme.border.radius};
`;

export const NaverOAuth = styled.img`
  width: 60%;
`;