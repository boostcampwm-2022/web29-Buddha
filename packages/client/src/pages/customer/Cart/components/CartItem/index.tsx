import { CartMenu } from '@/types';
import CountSelector from 'components/CountSelector';
import {
  CartItemWrapper,
  MenuImg,
  MenuInfoWrapper,
  MenuOptionWrapper,
  OptionPriceWrapper,
  CountWrapper,
  DeleteButton,
} from './styled';
import { getMenuIdx } from 'utils/localStorage';
import { getPriceComma } from 'utils/index';

interface CartItemProps {
  menu: CartMenu;
  setCount: Function;
  deleteMenu: Function;
}

function CartItem({ menu, setCount, deleteMenu }: CartItemProps) {
  const handleClickCount = (count: number) => {
    setCount(getMenuIdx(menu), count);
  };

  const handleClickDelete = () => {
    deleteMenu(getMenuIdx(menu));
  };

  return (
    <CartItemWrapper>
      <MenuImg src={menu.thumbnail} alt="메뉴" />
      <MenuInfoWrapper>
        <p className={'menu-name'}>{menu.name}</p>
        <OptionPriceWrapper>
          <MenuOptionWrapper>
            <p>
              {menu.type} | {menu.size}
            </p>
            {menu.options.map((option) => (
              <p key={option.id}>{option.name}</p>
            ))}
          </MenuOptionWrapper>
          <p>{getPriceComma(menu.price)}원</p>
        </OptionPriceWrapper>

        <CountWrapper>
          <CountSelector
            count={menu.count}
            svgWidth={0.8}
            svgHeight={0.8}
            onClick={handleClickCount}
          />
          <p>{getPriceComma(menu.price * menu.count)}원</p>
        </CountWrapper>
      </MenuInfoWrapper>
      <DeleteButton onClick={handleClickDelete} />
    </CartItemWrapper>
  );
}

export default CartItem;
