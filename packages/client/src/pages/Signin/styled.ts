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

export const TempSigninContainer = styled.section`
  padding: 1rem;
  width: 60%;
  text-align: center;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const TempInput = styled.input`
  width: 100%;
  padding: 0 0 0.2rem 0;
  margin: 0 0 0.5rem 0;
  font-size: ${(props) => props.theme.font.size.sm};
  border: none;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.grey400}`};

  &:focus {
    outline: none;
  }
`;
