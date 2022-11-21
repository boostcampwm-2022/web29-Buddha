import { useNavigate } from 'react-router-dom';
import { Menu } from '@/types/MenuList';
import { MenuImg, MenuWrapper, MenuInfoWrapper } from './styled';

function MenuItem(props: Menu) {
  const navigate = useNavigate();

  const handleClickMenuItem = () => {
    navigate(`/menu/${props.id}`);
  };

  return (
    <MenuWrapper key={props.id} onClick={handleClickMenuItem}>
      <MenuImg src={props.thumbnail} alt="메뉴 이미지" />
      <MenuInfoWrapper>
        <p>{props.name}</p>
        <p>{props.price}</p>
      </MenuInfoWrapper>
    </MenuWrapper>
  );
}

export default MenuItem;
