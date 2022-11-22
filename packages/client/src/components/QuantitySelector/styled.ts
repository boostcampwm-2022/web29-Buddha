import styled from '@emotion/styled';

import { ReactComponent as MinusSVG } from 'icons/minus.svg';
import { ReactComponent as PlusSVG } from 'icons/plus.svg';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
`;

export const Minus = styled(MinusSVG)<{ quantity: string }>`
  width: 20px;
  height: 20px;

  & > path {
    fill: ${(props) =>
      props.quantity === '1'
        ? props.theme.colors.grey200
        : props.theme.colors.grey800};
  }
`;

export const Plus = styled(PlusSVG)<{ quantity: string }>`
  width: 20px;
  height: 20px;

  & path {
    fill: ${(props) =>
      props.quantity === '20'
        ? props.theme.colors.grey200
        : props.theme.colors.grey800};
  }
`;
