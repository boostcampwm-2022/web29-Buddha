import { useNavigate } from 'react-router-dom';
import { Menu } from '@/types/MenuList';

function MenuItem(props: Menu) {
  const navigate = useNavigate();

  const handleClickMenuItem = () => {
    navigate(`/menu/${props.id}`);
  };

  return (
    <li key={props.id} onClick={handleClickMenuItem}>
      <img src={props.thumbnail} alt="메뉴 이미지" />
      <p>{props.name}</p>
      <p>{props.price}</p>
    </li>
  );
}

export default MenuItem;
