import React, { useEffect, useState } from 'react';
import {
  CategoryContainer,
  CategoryTitle,
  Container,
  OptionItemContainer,
  OptionsContainer,
  Title,
} from './styled';

import { Category, Option } from 'types/MenuDetail';
import { getPriceComma } from '@/utils';

interface OnClickInputProps {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

interface Props extends OnClickInputProps {
  options: Option[];
}

interface CategoryItemProps extends OnClickInputProps {
  category: string;
  options: Option[];
}

interface OptionItemProps extends OnClickInputProps {
  option: Option;
}

/**
 * 하나의 옵션 아이템 컴포넌트
 */
function OptionItem({ option, onClick }: OptionItemProps) {
  return (
    <OptionItemContainer>
      <p>{option.name}</p>
      <div>
        <p>{getPriceComma(option.price)} 원</p>
        <label>
          <input
            type="radio"
            value={option.id}
            name={option.category}
            onClick={onClick}
          />
        </label>
      </div>
    </OptionItemContainer>
  );
}

/**
 * 하나의 카테고리 아이템 컴포넌트, 옵션들 모음 컴포넌트
 */
function CategoryItem({ category, options, onClick }: CategoryItemProps) {
  return (
    <CategoryContainer>
      <CategoryTitle>{category}</CategoryTitle>
      <OptionsContainer>
        {options.map((option, idx) => (
          <OptionItem option={option} onClick={onClick} key={option.id} />
        ))}
      </OptionsContainer>
    </CategoryContainer>
  );
}

/**
 * 카테고리 리스트 컴포넌트
 *
 * (옵션들의 카테고리 모음 컴포넌트)
 */
function OptionSelector({ options, onClick }: Props) {
  const [categoryGroups, setCategoryGrops] = useState<Category>({});

  // 옵션 목록을 카테고리별로 분리
  useEffect(() => {
    const groups = options.reduce((prev: Category, curr) => {
      const category = curr.category as string;

      if (Object.keys(prev).includes(category)) {
        return { ...prev, [category]: [...prev[category], { ...curr }] };
      } else {
        return { ...prev, [category]: [{ ...curr }] };
      }
    }, {});

    setCategoryGrops(groups);
  }, [options]);

  return (
    <Container>
      <Title>퍼스널 옵션</Title>
      {Object.keys(categoryGroups).map((c) => (
        <CategoryItem
          category={c}
          options={categoryGroups[c]}
          key={c}
          onClick={onClick}
        />
      ))}
    </Container>
  );
}

export default OptionSelector;
