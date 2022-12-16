import { useNavigate } from 'react-router-dom';
import { Menu } from '@/types';
import { getPriceComma } from '@/utils';
import { MenuImg, MenuWrapper, MenuInfoWrapper } from './styled';

function MenuItem(props: Menu) {
  const navigate = useNavigate();

  const handleClickMenuItem = () => {
    navigate(`/menu/${props.id}`);
  };

  return (
    <MenuWrapper
      key={props.id}
      onClick={handleClickMenuItem}
      data-testid={'menu-item'}
    >
      <MenuImg src={props.thumbnail} alt="메뉴 이미지" />
      <MenuInfoWrapper>
        <p>{props.name}</p>
        <p>{getPriceComma(props.price)}원</p>
      </MenuInfoWrapper>
    </MenuWrapper>
  );
}

export default MenuItem;
