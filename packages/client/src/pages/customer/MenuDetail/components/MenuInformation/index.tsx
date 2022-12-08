import { memo } from 'react';

import { Img, MenuInfoContainer } from './styled';
import { MenuInfo } from '@/types';

interface Props {
  menu: MenuInfo;
}

function MenuInformation({ menu }: Props) {
  return (
    <>
      <Img src={menu.thumbnail} alt="음료" />
      <MenuInfoContainer>
        <h2>{menu.name}</h2>
        <p className="description">{menu.description}</p>
      </MenuInfoContainer>
    </>
  );
}

export default memo(MenuInformation);
