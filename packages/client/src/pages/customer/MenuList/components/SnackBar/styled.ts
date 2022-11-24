import styled from '@emotion/styled';

export const SnackBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  position: fixed;
  bottom: 3rem;
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem 0 1rem;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  font-size: ${(props) => props.theme.font.size.xs};
  font-weight: ${(props) => props.theme.font.weight.bold500};
`;

export const CartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
`;
