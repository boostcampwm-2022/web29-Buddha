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
`;

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Receipt = styled(ReceiptSVG)`
  margin-right: 10px;
  min-width: 1.5rem;
`;

export const DownArrow = styled(DownArrowSVG)`
  margin-left: 10px;
`;

export const PriceText = styled.p`
  margin: 0 0 0 0.7rem;
  white-space: nowrap;
`;
