import styled from '@emotion/styled';

export const Container = styled.main`
  width: 100%;
`;

export const BackArrow = styled.i`
  position: absolute;
  top: 2%;
  left: 2%;
  color: ${(props) => props.theme.colors.grey600};
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
