import styled from '@emotion/styled';

export const CartFooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  padding: 0.8rem 2rem 1rem 2rem;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const CartFooterInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 0.2rem 0 0.2rem;
  font-weight: ${(props) => props.theme.font.weight.bold700};

  .cart-number {
    font-size: ${(props) => props.theme.font.size.xs};
  }

  .cart-price {
    font-size: ${(props) => props.theme.font.size.lg};
  }
`;
