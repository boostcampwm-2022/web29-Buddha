import styled from '@emotion/styled';

export const CartPageWrapper = styled.div`
  width: 100%;
`;

export const CartHeader = styled.div`
  width: 100%;
  padding: 2rem 1.5rem 0.6rem 1.5rem;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;

  .title {
    margin-bottom: 0.6rem;
    font-size: ${(props) => props.theme.font.size.lg};
  }

  .input-cafe {
    padding-bottom: 2px;
    font-size: ${(props) => props.theme.font.size.xs};
    border-bottom: 1px solid white;
  }
`;

export const CartContentWrapper = styled.div`
  width: 100%;
  padding: 1rem 1.5rem 5rem 1.5rem;

  .title {
    font-size: ${(props) => props.theme.font.size.sm};
    font-weight: ${(props) => props.theme.font.weight.bold700};
  }
`;
