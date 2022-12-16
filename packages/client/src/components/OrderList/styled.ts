import styled from '@emotion/styled';

import { ReactComponent as ReceiptSVG } from 'icons/receipt.svg';
import { ReactComponent as DownArrowSVG } from 'icons/down_arrow.svg';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.7rem;
  margin: 0.7rem 0;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.3rem 0.8rem;
  cursor: pointer;

  border-radius: 10px;
  box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.5);

  transition: box-shadow, transform;
  transition-duration: 0.5s;

  &:hover {
    box-shadow: 0px 0px 10px 2px grey;
    transform: scale(1.01);
  }
`;

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
`;

export const Receipt = styled(ReceiptSVG)`
  margin-right: 10px;
  min-width: 1.5rem;
`;

export const DownArrow = styled(DownArrowSVG)`
  margin-left: 10px;
  cursor: pointer;
`;

export const PriceText = styled.p`
  margin: 0 0 0 0.7rem;
  white-space: nowrap;
`;

export const OrderIdText = styled.p`
  padding: 0.5rem 0 0 0.6rem;
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.grey800};
`;
