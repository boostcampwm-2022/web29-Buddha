import styled from '@emotion/styled';

import { ReactComponent as MinusSVG } from 'icons/minus.svg';
import { ReactComponent as PlusSVG } from 'icons/plus.svg';
import { Props } from '.';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
`;

export const Minus = styled(MinusSVG)<Props>`
  width: ${({ svgWidth }) => svgWidth}rem;
  height: ${({ svgHeight }) => svgHeight}rem;

  & > path {
    fill: ${({ quantity, theme }) =>
      quantity === 1 ? theme.colors.grey200 : theme.colors.grey800};
  }
`;

export const Plus = styled(PlusSVG)<Props>`
  width: ${({ svgWidth }) => svgWidth}rem;
  height: ${({ svgHeight }) => svgHeight}rem;

  & path {
    fill: ${({ quantity, theme }) =>
      quantity === 20 ? theme.colors.grey200 : theme.colors.grey800};
  }
`;
