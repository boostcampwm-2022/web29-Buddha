import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { ReactComponent as SVG } from 'icons/left_arrow.svg';
import { Props } from '.';

export const LeftArrowSVG = styled(SVG)<Props>`
  position: absolute;
  top: ${({ top }) => top}rem;
  left: ${({ left }) => left}rem;
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height}rem;
  color: ${(props) => props.theme.colors.grey600};
  cursor: pointer;

  & path {
    fill: ${({ color, theme }: { color: string; theme: Theme }) => {
      if (
        color === 'primary' ||
        color === 'secondary' ||
        color === 'tertiary' ||
        color === 'fourth'
      )
        return theme.colors[color];
      return color;
    }};
  }
`;
