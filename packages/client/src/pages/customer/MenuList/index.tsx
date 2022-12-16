import { useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SnackBar from './components/SnackBar';
import MenuItem from './components/MenuItem';

import { Menu } from '@/types';
import useMenuListData from '@/hooks/useMenuListData';

import {
  CategoryBarWrapper,
  CategoryItem,
  MenuListPageWrapper,
  MenuListWrapper,
} from './styled';

function MenuList() {
  const [category, setCategory] = useState<string>('전체');
  const { menuList, categoryList } = useMenuListData();

  return (
    <MenuListPageWrapper data-testid={'menu-list-page'}>
      <Header title={'Order'} />
      <CategoryBarWrapper data-testid={'category-bar'}>
        {categoryList?.map((category, idx) => (
          <CategoryItem key={idx} onClick={() => setCategory(category)}>
            {category}
          </CategoryItem>
        ))}
      </CategoryBarWrapper>
      <MenuListWrapper>
        {menuList
          ?.filter((menu: Menu) => {
            if (category === '전체') return true;
            return menu.category === category;
          })
          .map((menu: Menu) => (
            <MenuItem
              key={menu.id}
              id={menu.id}
              name={menu.name}
              thumbnail={menu.thumbnail}
              price={menu.price}
              category={menu.category}
            />
          ))}
      </MenuListWrapper>
      <SnackBar />
      <Footer />
    </MenuListPageWrapper>
  );
}

export default MenuList;
