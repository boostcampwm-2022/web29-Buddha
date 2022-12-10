import React, { memo, useCallback, useMemo } from 'react';

import { SIZES, SIZE_VOLUME } from '@/constants';
import { Size } from '@/types';
import { getFirstUpper } from '@/utils';
import { useMenuDetailDispatch } from '@/stores/MenuDetail';

import {
  Container,
  ItemContainer,
  SizeIcon,
  SizeText,
  VolumeText,
} from './styled';

interface Props {
  size: Size;
}

interface ItemProps extends Props {
  isSelected: boolean;
}

// 음료 사이즈 선택 아이템 컴포넌트
const Item = memo(function ({ size, isSelected }: ItemProps) {
  const dispatch = useMenuDetailDispatch();

  const handleClickSize = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const newSize = event.currentTarget.title;

      if (newSize === SIZES[0] || newSize === SIZES[1] || newSize === SIZES[2])
        return dispatch({ type: 'SET_SIZE', size: newSize });
    },
    [dispatch]
  );

  const memorizedText = useMemo(
    () => (
      <>
        <SizeIcon size={size} />
        <SizeText>{getFirstUpper(size)}</SizeText>
        <VolumeText>{SIZE_VOLUME[size]}ml</VolumeText>
      </>
    ),
    [size]
  );

  return (
    <ItemContainer
      title={size}
      isSelected={isSelected}
      onClick={handleClickSize}
    >
      {memorizedText}
    </ItemContainer>
  );
});

// 음료 사이즈 선택 컴포넌트
function SizeSelector({ size }: Props) {
  const items = SIZES.map((s) => (
    <Item size={s} isSelected={size === s} key={s} />
  ));

  return <Container>{items}</Container>;
}

export default memo(SizeSelector);
