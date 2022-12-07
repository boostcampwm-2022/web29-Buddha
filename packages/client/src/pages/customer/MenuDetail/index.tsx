import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import LeftArrow from 'components/LeftArrow';
import MenuInformation from './components/MenuInformation';
import TemperatureSelector from './components/TemperatureSelector';
import SizeSelector from './components/SizeSelector';
import OptionSelector from './components/OptionSelector';
import Amount from './components/Amount';
import OrderButton from './components/OrderButton';

import useFetch from '@/hooks/useFetch';
import { MenuInfo } from '@/types';
import MenuDetailContextProvider, {
  useMenuDetailDispatch,
  useMenuDetailState,
} from '@/stores/MenuDetail';
import { SIZES } from '@/constants';

import { Container } from './styled';

function MenuDetail() {
  const { menu, count, temperature, size, options, price } =
    useMenuDetailState();
  const dispatch = useMenuDetailDispatch();
  const { menuId } = useParams();

  const newMenu = useFetch({
    url: `/cafe/menu/${menuId}`,
    method: 'get',
  }).jsonData as MenuInfo;

  /**
   * 뒤로가기 버튼 메모라이즈
   */
  const memorizedLeftArrow = useMemo(
    () => <LeftArrow color="primary" top={1} left={1} />,
    []
  );

  useEffect(() => {
    if (!newMenu) return;
    dispatch({ type: 'SET_MENU', menu: newMenu });
  }, [newMenu, dispatch]);

  /**
   * 금액 계산
   */
  useEffect(() => {
    if (!menu) return;

    let price = menu.price + SIZES.findIndex((s) => s === size) * 500;

    price = Object.keys(options).reduce((prev, category) => {
      return (
        prev +
        (menu.options.find(({ id }) => id.toString() === options[category])
          ?.price ?? 0)
      );
    }, price);

    dispatch({ type: 'SET_PRICE', price });
  }, [menu, size, options, dispatch]);

  return (
    <Container data-testid={'menu-detail-page'}>
      {!menu ? (
        <p>메뉴 정보를 불러오는 중...</p>
      ) : (
        <>
          {memorizedLeftArrow}
          <MenuInformation menu={menu} />
          <Amount price={price} count={count} />
          <TemperatureSelector temperature={temperature} />
          <SizeSelector size={size} />
          {menu.options && <OptionSelector options={menu.options} />}
          <OrderButton />
        </>
      )}
    </Container>
  );
}

function MenuDetailPage() {
  return (
    <MenuDetailContextProvider>
      <MenuDetail />
    </MenuDetailContextProvider>
  );
}

export default MenuDetailPage;
