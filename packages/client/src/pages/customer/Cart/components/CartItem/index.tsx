import { CartMenu } from '@/types';
import QuantitySelector from '../../../../../components/QuantitySelector';
import {
  CartItemWrapper,
  MenuImg,
  MenuInfoWrapper,
  MenuOptionWrapper,
  OptionPriceWrapper,
  QuantityWrapper,
  DeleteButton,
} from './styled';
import { getMenuIdx } from 'utils/localStorage';
import { getPriceComma } from 'utils/index';

interface CartItemProps {
  menu: CartMenu;
  setQuantity: Function;
  deleteMenu: Function;
}

function CartItem({ menu, setQuantity, deleteMenu }: CartItemProps) {
  const handleClickQuantity = (quantity: number) => {
    setQuantity(getMenuIdx(menu), quantity);
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

        <QuantityWrapper>
          <QuantitySelector
            quantity={menu.quantity}
            svgWidth={0.8}
            svgHeight={0.8}
            onClick={handleClickQuantity}
          />
          <p>{getPriceComma(menu.price * menu.quantity)}원</p>
        </QuantityWrapper>
      </MenuInfoWrapper>
      <DeleteButton onClick={handleClickDelete} />
    </CartItemWrapper>
  );
}

export default CartItem;
