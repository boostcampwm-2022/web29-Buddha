import styled from '@emotion/styled';

export const Container = styled.main`
  width: 100%;
`;

export const AmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const MenuInfoContainer = styled.section`
  margin: 10% 5%;

  & > h2,
  & > .price {
    font-size: ${(props) => props.theme.font.size.lg};
  }

  & > .description {
    margin: 15px 0;
    color: ${(props) => props.theme.colors.grey600};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 0px 4px rgba(0, 0, 0, 0.25);
`;
