import styled from '@emotion/styled';

import { ReactComponent as ReceiptSVG } from 'icons/receipt.svg';
import { ReactComponent as DownArrowSVG } from 'icons/down_arrow.svg';

export const Container = styled.section`
  margin: 3% 0;
  width: 100%;
`;

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Receipt = styled(ReceiptSVG)`
  margin-right: 10px;
`;

export const DownArrow = styled(DownArrowSVG)`
  margin-left: 10px;
`;
