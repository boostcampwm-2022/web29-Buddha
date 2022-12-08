import styled from '@emotion/styled';

export const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const MenuInfoContainer = styled.section`
  margin: 1rem;

  & > h2,
  & > .price {
    font-size: ${(props) => props.theme.font.size.lg};
  }

  & > .description {
    margin: 1rem 0;
    color: ${(props) => props.theme.colors.grey600};
  }
`;
