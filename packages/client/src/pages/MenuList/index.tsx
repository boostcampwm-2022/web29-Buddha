import axios from 'axios';
import { useState, useEffect } from 'react';
import { CafeMenu } from 'types/MenuList';

function MenuList() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [menuList, setMenuList] = useState<CafeMenu>();

  const fetchMenuList = async () => {
    try {
      const res = await axios.get(`${api}/cafe/1/menus`, { withCredentials: true });
      setMenuList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (<div>
    <ul>
        {menuList?.menus.map(menu => (
            <li key={menu.id}>
                <img src={menu.thumbnail} alt='메뉴 이미지'/>
                <p>{menu.name}</p>
                <p>{menu.price}</p>
            </li>
        ))}
    </ul>
  </div>);
}

export default MenuList;
