import styled from '@emotion/styled';

export const Container = styled.section<{ noBottomPadding?: boolean }>`
  padding: 0 0
    ${({ noBottomPadding }) => (noBottomPadding === true ? '0' : '3rem')} 0;
`;

export const ItemContainer = styled.div`
  padding: 1rem;
  width: 100%;
`;

export const NoOrderContainer = styled.div`
  margin: 0.5rem 1rem;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.fourth};
`;
