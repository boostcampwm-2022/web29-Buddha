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
  font-weight: ${(props) => props.theme.font.weight.bold500};
`;
