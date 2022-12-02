import styled from '@emotion/styled';

import { ReactComponent as MinusSVG } from 'icons/minus.svg';
import { ReactComponent as PlusSVG } from 'icons/plus.svg';

interface Props {
  count: number;
  width: number;
  height: number;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
`;

export const Minus = styled(MinusSVG)<Props>`
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;

  & > path {
    fill: ${({ count, theme }) =>
      count === 1 ? theme.colors.grey200 : theme.colors.grey800};
  }
`;

export const Plus = styled(PlusSVG)<Props>`
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;

  & path {
    fill: ${({ count, theme }) =>
      count === 20 ? theme.colors.grey200 : theme.colors.grey800};
  }
`;
