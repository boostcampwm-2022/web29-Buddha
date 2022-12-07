import { QUERY_KEYS } from '@/constants';
import { Menu } from '@/types';
import useCustomQuery from './useCustomQuery';

function useMenuListData() {
  const data = useCustomQuery({
    queryKey: QUERY_KEYS.MENU_LIST_DATA,
    url: '/cafe/1/menus',
  });

  if (data) {
    return {
      menuList: data.data.menus,
      categoryList: makeCategoryList(data.data.menus),
    };
  }

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
