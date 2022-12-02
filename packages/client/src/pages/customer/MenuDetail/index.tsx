import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import TypeSelector from './components/TypeSelector';
import SizeSelector from './components/SizeSelector';
import OptionSelector from './components/OptionSelector';
import QuantitySelector from 'components/QuantitySelector';
import Button from 'components/Button';

import {
  AmountContainer,
  ButtonContainer,
  Container,
  Img,
  MenuInfoContainer,
} from './styled';
import { MenuInfo, Options, Size, Temperature } from '@/types';
import { getPriceComma } from 'utils/index';
import LeftArrow from '@/components/LeftArrow';

function MenuDetail() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [menu, setMenu] = useState<MenuInfo | null | undefined>(null);
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState<Temperature>('hot');
  const [size, setSize] = useState<Size>('tall');
  const [options, setOptions] = useState<Options>({});
  const [singlePrice, setSinglePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { menuId } = useParams();
  const navigate = useNavigate();

  /**
   * 음료 타입(핫, 아이스) 선택에 따라 음료 타입 변경
   *
   * @param event 클릭 이벤트
   */
  const handleClickType = (event: React.MouseEvent<HTMLSpanElement>) => {
    const newType = event.currentTarget.className;

    if (newType !== 'hot' && newType !== 'iced') return;
    setType(newType);
  };

  /**
   * 음료 용량 선택에 따라 용량 변경
   *
   * @param event 클릭 이벤트
   */
  const handleClickSize = (event: React.MouseEvent<HTMLDivElement>) => {
    const newSize = event.currentTarget.title;

    if (newSize !== 'tall' && newSize !== 'grande' && newSize !== 'venti')
      return;
    setSize(newSize);
  };

  /**
   * 주문하기 버튼 클릭에 따른 장바구니 추가
   */
  const handleClickOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = 'buddhaCart';
    const storage = localStorage.getItem(key);
    const prevCart: [] = storage ? JSON.parse(storage) : [];

    if (!menu || !type || !size) return;

    const isExist = prevCart.find((cart: any) => {
      return (
        cart.id === menu.id &&
        cart.type === type &&
        cart.size === size &&
        JSON.stringify(cart.options.sort((a: number, b: number) => a - b)) ===
          JSON.stringify(
            Object.keys(options)
              .map((k) => menu.options.find((o) => o.id === Number(options[k])))
              .sort((a, b) => Number(a) - Number(b))
          )
      );
    });

    let currCart;
    if (isExist) {
      currCart = prevCart.map((cart: any) => {
        if (
          cart.id === menu.id &&
          cart.type === type &&
          cart.size === size &&
          JSON.stringify(cart.options.sort((a: number, b: number) => a - b)) ===
            JSON.stringify(
              Object.keys(options)
                .map((k) =>
                  menu.options.find((o) => o.id === Number(options[k]))
                )
                .sort((a, b) => Number(a) - Number(b))
            )
        ) {
          return {
            ...cart,
            quantity: cart.quantity + quantity,
          };
        }
        return { ...cart };
      });
    } else {
      currCart = [
        ...prevCart,
        {
          id: menu.id,
          name: menu.name,
          type,
          size,
          quantity,
          thumbnail: menu.thumbnail,
          price: singlePrice,
          options: Object.keys(options).reduce((prev: any, curr) => {
            if (!options[curr]) {
              return [...prev];
            }
            return [
              ...prev,
              menu.options.find((o) => o.id === Number(options[curr])),
            ];
          }, []),
        },
      ];
    }

    localStorage.setItem(key, JSON.stringify(currCart));
    alert('장바구니에 담겼습니다.');
    navigate('/menu');
  };

  /**
   * 카테고리별 옵션 선택에 따라 옵션 변경
   */
  const handleClickOption = (event: React.MouseEvent<HTMLInputElement>) => {
    const category = event.currentTarget.name;
    const currOption = event.currentTarget.value;

    if (Object.keys(options).includes(category)) {
      const prevOption = options[category];

      if (prevOption === currOption) {
        event.currentTarget.checked = false;
        return setOptions({ ...options, [category]: undefined });
      }
    }
    return setOptions({ ...options, [category]: currOption });
  };

  /**
   * 수량 선택에 따라 수량 변경
   */
  const handleClickQuantity = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);

  /**
   * 초기 메뉴 상세 정보 조회
   */
  useEffect(() => {
    if (!api || !menuId) return;

    const getMenuInfo = async () => {
      try {
        const res = await axios.get(`${api}/cafe/menu/${menuId}`);
        setMenu(res.data);
      } catch (err) {
        alert('메뉴 상세 조회 실패 다시 시도해주세요.');
        setMenu(undefined);
      }
    };

    getMenuInfo();
  }, [api, menuId]);

  /**
   * 총 금액 계산
   *
   * 사이즈, 수량, 옵션 선택에 따라 총 금액 계산
   */
  useEffect(() => {
    if (!menu) return;

    let price = menu.price;

    price = price + (size === 'tall' ? 0 : size === 'grande' ? 500 : 1000);

    Object.keys(options).forEach((key) => {
      const optionPrice = menu.options.find(
        (o) => o.id.toString() === options[key]
      )?.price;

      if (!optionPrice) return;
      price += optionPrice;
    });

    setSinglePrice(price);

    price *= quantity;

    setTotalPrice(price);
  }, [menu, size, options, quantity]);

  /**
   * 메뉴 정보 렌더링 (Memorize)
   */
  const MenuInfo = useMemo(() => {
    if (!menu) return;

    return (
      <>
        <Img src={menu.thumbnail} alt="음료" />
        <MenuInfoContainer>
          <h2>{menu.name}</h2>
          <p className="description">{menu.description}</p>
          <AmountContainer>
            <p className="price">{getPriceComma(totalPrice)}원</p>
            <QuantitySelector
              quantity={quantity}
              svgWidth={1}
              svgHeight={1}
              onClick={handleClickQuantity}
            />
          </AmountContainer>
        </MenuInfoContainer>
      </>
    );
  }, [menu, quantity, handleClickQuantity, totalPrice]);

  return (
    <Container data-testid={'menu-detail-page'}>
      {menu === null ? (
        <p>Loading...</p>
      ) : menu === undefined ? (
        <p>데이터 조회 오류</p>
      ) : (
        <>
          <LeftArrow color="primary" top={1} left={1} />
          {MenuInfo}
          <TypeSelector type={type} onClick={handleClickType} />
          <SizeSelector size={size} onClick={handleClickSize} />
          {menu.options.length > 0 && (
            <OptionSelector
              onClick={handleClickOption}
              options={menu.options}
            />
          )}
          <ButtonContainer>
            <Button className="wd-80" onClick={handleClickOrder}>
              장바구니 담기
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}

export default MenuDetail;
