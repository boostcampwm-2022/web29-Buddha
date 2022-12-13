import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.fourth};

  & p {
    margin: 15px 0;
    font-size: ${(props) => props.theme.font.size.md};
  }
`;

export const Logo = styled.img`
  width: 80%;
`;

export const NaverOAuth = styled.img`
  width: 40%;
  cursor: pointer;
`;
