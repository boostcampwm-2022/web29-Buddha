import React, { useMemo } from 'react';
import { Container, ItemContainer, SizeText, VolumeText } from './styled';
import { SIZE_VOLUME } from '@/constants';
import { Size } from 'types/MenuDetail';
import { getFirstUpper } from '@/utils';

interface Props {
  size: Size;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface ItemProps extends Props {
  isSelected: boolean;
}

// 음료 사이즈 선택 아이템 컴포넌트
function Item({ size, isSelected, onClick }: ItemProps) {
  const sizeText = useMemo(
    () => <SizeText>{getFirstUpper(size)}</SizeText>,
    [size]
  );
  const volumeText = useMemo(
    () => <VolumeText>{SIZE_VOLUME[size]}ml</VolumeText>,
    [size]
  );

  return (
    <ItemContainer title={size} isSelected={isSelected} onClick={onClick}>
      <p>icon</p>
      {sizeText}
      {volumeText}
    </ItemContainer>
  );
}

// 음료 사이즈 선택 컴포넌트
function SizeSelector({ size, onClick }: Props) {
  const sizes: Size[] = ['tall', 'grande', 'venti'];

  const items = sizes.map((s) => (
    <Item size={s} isSelected={size === s} onClick={onClick} key={s} />
  ));

  return <Container>{items}</Container>;
}

export default SizeSelector;
