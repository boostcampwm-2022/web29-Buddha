import styled from '@emotion/styled';

export const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const MenuInfoContainer = styled.section`
  margin: 1rem;

  & > .price {
    font-size: ${({theme}) => theme.font.size.lg};
  }

  h2{
    font-size: ${({theme}) => theme.font.size.xl};
    font-weight: ${({theme}) => theme.font.weight.bold500};
  }

  & > .description {
    margin: 1rem 0;
    color: ${({theme}) => theme.colors.grey600};
    font-size: ${({theme}) => theme.font.size.sm};
  }
`;
