import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.fourth};
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivisionLine = styled.div`
  height: 1px;
  /* 
  Cusomize CSS Border
  https://kovart.github.io/dashed-border-generator/
  */
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
`;

export const PriceText = styled.p`
  margin: 0 0 0 0.7rem;
  white-space: nowrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
