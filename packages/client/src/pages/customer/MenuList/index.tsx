import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CafeMenu } from 'types/MenuList';
import MenuItem from '@/pages/customer/MenuList/components/MenuItem';
import Footer from '@/components/Footer';
import {
  CategoryBarWrapper,
  CategoryItem,
  MenuListPageWrapper,
  MenuListWrapper,
} from './styled';
import SnackBar from '@/pages/customer/MenuList/components/SnackBar';
import Header from '@/components/Header';

interface Menu {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  category: string;
}

function MenuList() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [menuList, setMenuList] = useState<CafeMenu>();
  const [categoryList, setCategoryList] = useState<string[]>(['전체']);
  const [category, setCategory] = useState<string>('전체');

  const fetchMenuList = async () => {
    try {
      const res = await axios.get(`${api}/cafe/1/menus`, {
        withCredentials: true,
      });
      setMenuList(res.data);
      setCategoryList(
        Array.from(
          new Set(
            ['전체'].concat(res.data.menus.map((menu: Menu) => menu.category))
          )
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <MenuListPageWrapper>
      <Header title={'Order'} />
      <CategoryBarWrapper>
        {categoryList.map((category, idx) => (
          <CategoryItem key={idx} onClick={() => setCategory(category)}>
            {category}
          </CategoryItem>
        ))}
      </CategoryBarWrapper>
      <MenuListWrapper>
        {menuList?.menus
          .filter((menu) => menu.category === category)
          .map((menu) => (
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
