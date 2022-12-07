import Button from '@/components/Button';
import { CART_KEY } from '@/constants';
import { useMenuDetailState } from '@/stores/MenuDetail';
import { CartMenu, Option } from '@/types';
import { getCart, setLocalStorage } from '@/utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { Container } from './styled';

function OrderButton() {
  const { menu, temperature, size, price, options, count } =
    useMenuDetailState();
  const navigate = useNavigate();

  const handleClickOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!menu) return;

    /**
     * 현재 선택된 옵션들 형태 변환
     *
     * {카테고리: ID} -> {옵션 객체}[]
     */
    const convertedOptions = Object.keys(options)
      .reduce<Option[]>((prev, curr) => {
        const option = menu.options.find(
          ({ id }) => id.toString() === options[curr]
        );
        if (!option) return prev;
        return [...prev, { ...option }];
      }, [])
      .sort((a, b) => a.id - b.id);

    const prevCart: CartMenu[] = getCart();
    const currMenu = {
      id: menu.id,
      name: menu.name,
      type: temperature,
      size,
      count,
      thumbnail: menu.thumbnail,
      price: price,
      options: convertedOptions,
    };

    const isSameMenu = (cart: CartMenu) =>
      cart.id === menu.id &&
      cart.type === temperature &&
      cart.size === size &&
      compareOptions(cart);

    const compareOptions = (cart: CartMenu) =>
      JSON.stringify(cart.options.sort((a, b) => a.id - b.id)) ===
      JSON.stringify(convertedOptions);

    const isExist = prevCart.find((cart) => isSameMenu(cart));

    let currCart;
    if (!isExist) {
      currCart = [...prevCart, currMenu];
    } else {
      currCart = prevCart.reduce<CartMenu[]>((prev, curr) => {
        if (isSameMenu(curr))
          return [...prev, { ...curr, count: curr.count + count }];
        return [...prev, { ...curr }];
      }, []);
    }

    setLocalStorage(CART_KEY, JSON.stringify(currCart));
    alert('장바구니에 담겼습니다.');
    navigate('/menu');
  };

  return (
    <Container>
      <Button className="wd-80" onClick={handleClickOrder}>
        장바구니 담기
      </Button>
    </Container>
  );
}

export default OrderButton;
