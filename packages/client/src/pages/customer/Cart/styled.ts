import styled from '@emotion/styled';

export const CartPageWrapper = styled.div`
  width: 100%;
`;

export const FixedHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 480px;
  height: 2rem;
  background-color: ${(props) => props.theme.colors.secondary};
  z-index: 1;
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
  padding: 1rem 0rem 5rem 0rem;

  .title {
    padding: 0 1rem 0 1rem;
    font-size: ${(props) => props.theme.font.size.sm};
    font-weight: ${(props) => props.theme.font.weight.bold700};
  }
`;
