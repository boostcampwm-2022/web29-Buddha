import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { CafeMenu, Menu } from '@/types';

function useMenuListData() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const { isSuccess, isError, data, error } = useQuery(
    [QUERY_KEYS.MENU_LIST_DATA],
    async () =>
      await axios.get<CafeMenu>(`${api}/cafe/1/menus`, {
        withCredentials: true,
      })
  );

  if (isSuccess) {
    return {
      menuList: data.data.menus,
      categoryList: makeCategoryList(data.data.menus),
    };
  }
  if (isError) console.log(error);

  return {
    menuList: [],
    categoryList: [],
  };
}

function makeCategoryList(menuList: Menu[]) {
  if (menuList) {
    return Array.from(
      new Set(['전체'].concat(menuList.map((menu: Menu) => menu.category)))
    );
  }
}

export default useMenuListData;
