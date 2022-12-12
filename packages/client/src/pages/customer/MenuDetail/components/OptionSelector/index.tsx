import React, { memo, useEffect, useState } from 'react';
import {
  CategoryContainer,
  CategoryTitle,
  Container,
  OptionItemContainer,
  OptionsContainer,
  Title,
} from './styled';

import { Category, Option } from '@/types';
import { getPriceComma } from '@/utils';
import { useMenuDetailDispatch, useMenuDetailState } from '@/stores/MenuDetail';

interface Props {
  options: Option[];
}

interface CategoryItemProps {
  category: string;
  menuOptions: Option[];
}

interface OptionItemProps {
  option: Option;
}

/**
 * 하나의 옵션 아이템 컴포넌트
 */
function OptionItem({ option }: OptionItemProps) {
  const { options } = useMenuDetailState();
  const dispatch = useMenuDetailDispatch();

  const handleClickOption = (event: React.MouseEvent<HTMLInputElement>) => {
    const category = event.currentTarget.name;
    const prevOption = options[category];
    const currOption = event.currentTarget.value;

    // 새로운 옵션 선택
    if (!options[category] || prevOption !== currOption)
      return dispatch({
        type: 'SET_OPTIONS',
        options: { ...options, [category]: currOption },
      });

    // 동일한 옵션을 선택하면 취소
    event.currentTarget.checked = false;
    return dispatch({
      type: 'SET_OPTIONS',
      options: { ...options, [category]: undefined },
    });
  };

  return (
    <OptionItemContainer>
      <p>{option.name}</p>
      <div>
        <p>+ {getPriceComma(option.price)} 원</p>
        <label>
          <input
            type="radio"
            value={option.id}
            name={option.category}
            onClick={handleClickOption}
          />
        </label>
      </div>
    </OptionItemContainer>
  );
}

/**
 * 하나의 카테고리 아이템 컴포넌트, 옵션들 모음 컴포넌트
 */
function CategoryItem({ category, menuOptions }: CategoryItemProps) {
  return (
    <CategoryContainer>
      <CategoryTitle>{category}</CategoryTitle>
      <OptionsContainer>
        {menuOptions.map((option) => (
          <OptionItem option={option} key={option.id} />
        ))}
      </OptionsContainer>
    </CategoryContainer>
  );
}

function OptionSelector({ options }: Props) {
  const [categoryGroups, setCategoryGrops] = useState<Category>({});

  // 옵션 목록을 카테고리별로 분리
  useEffect(() => {
    const groups = options.reduce((prev: Category, curr) => {
      const category = curr.category;

      return { ...prev, [category]: [...(prev[category] ?? []), { ...curr }] };
    }, {});

    setCategoryGrops(groups);
  }, [options]);

  return (
    <>
      <Container>
        <Title>퍼스널 옵션</Title>
        {Object.keys(categoryGroups).map((c) => (
          <CategoryItem category={c} menuOptions={categoryGroups[c]} key={c} />
        ))}
      </Container>
    </>
  );
}

export default memo(OptionSelector);
