import axios from 'axios';
import { useState, useEffect } from 'react';
import { CafeMenu } from 'types/MenuList';
import MenuItem from 'components/MenuItem';

function MenuList() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [menuList, setMenuList] = useState<CafeMenu>();

  const fetchMenuList = async () => {
    try {
      const res = await axios.get(`${api}/cafe/1/menus`, {
        withCredentials: true,
      });
      setMenuList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <div>
      <ul>
        {menuList?.menus.map((menu) => (
          <MenuItem
            key={menu.id}
            id={menu.id}
            name={menu.name}
            thumbnail={menu.thumbnail}
            price={menu.price}
          />
        ))}
      </ul>
    </div>
  );
}

export default MenuList;
