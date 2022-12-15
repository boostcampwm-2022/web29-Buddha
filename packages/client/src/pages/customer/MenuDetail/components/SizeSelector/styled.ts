import styled from '@emotion/styled';

import { Size } from '@/types';
import { ReactComponent as SizeSVG } from 'icons/size.svg';

export const Container = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5%;
`;

export const ItemContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem;
  width: 28%;
  height: 5rem;
  border-radius: 10px;
  text-align: center;
  border: ${(props) => props.theme.border.default};
  border-width: 2px;
  border-color: ${(props) =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.grey200};
  cursor: pointer;
`;

export const SizeText = styled.p`
  font-size: ${(props) => props.theme.font.size.md};
`;

export const VolumeText = styled.p`
  font-size: ${(props) => props.theme.font.size.xs};
  color: ${(props) => props.theme.colors.grey600};
`;

export const SizeIcon = styled(SizeSVG)<{ size: Size }>`
  width: ${(props) =>
    props.size === 'tall'
      ? '1rem'
      : props.size === 'grande'
      ? '1.5rem'
      : '2rem'};
  height: ${(props) =>
    props.size === 'tall'
      ? '1rem'
      : props.size === 'grande'
      ? '1.5rem'
      : '2rem'};
`;
