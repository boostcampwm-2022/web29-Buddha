import styled from '@emotion/styled';

export const Container = styled.section`
  position: absolute;
  padding: 0.6rem 1.5rem;
  left: 50%;
  bottom: 4rem;
  transform: translate(-50%, 0);
  color: white;
  background-color: rgba(102, 102, 102, 0.9);
  border-radius: 50px;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.bold500};
  z-index: 999;
`;
