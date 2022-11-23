import { useCallback } from 'react';
import { CartMenu } from 'types/Cart';
import QuantitySelector from '../QuantitySelector';
import {
  CartItemWrapper,
  MenuImg,
  MenuInfoWrapper,
  MenuOptionWrapper,
  OptionPriceWrapper,
  QuantityWrapper,
} from './styled';
import { getMenuIdx } from 'utils/localStorage';

interface CartItemProps {
  menu: CartMenu;
  setQuantity: Function;
}

function CartItem({ menu, setQuantity }: CartItemProps) {
  const handleClickQuantity = useCallback((quantity: number) => {
    setQuantity(getMenuIdx(menu), quantity);
  }, []);

  return (
    <CartItemWrapper>
      <MenuImg src={menu.thumbnail} alt="메뉴" />
      <MenuInfoWrapper>
        <p>{menu.name}</p>
        <OptionPriceWrapper>
          <MenuOptionWrapper>
            <p>
              {menu.type} | {menu.size}
            </p>
            {menu.options.map((option) => (
              <p key={option.id}>{option.name}</p>
            ))}
          </MenuOptionWrapper>
          <p>{menu.price}원</p>
        </OptionPriceWrapper>

        <QuantityWrapper>
          <QuantitySelector
            quantity={menu.quantity}
            onClick={handleClickQuantity}
          />
          <p>{menu.price * menu.quantity}원</p>
        </QuantityWrapper>
      </MenuInfoWrapper>
    </CartItemWrapper>
  );
}

export default CartItem;
