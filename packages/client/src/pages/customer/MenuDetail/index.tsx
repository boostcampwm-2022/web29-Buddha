import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import TypeSelector from 'components/TypeSelector';
import SizeSelector from 'components/SizeSelector';
import OptionSelector from 'components/OptionSelector';

import { BackArrow, Container, Img, MenuInfoContainer } from './styled';
import { MenuInfo, Options, Size, Type } from 'types/MenuDetail';
import { getPriceComma } from 'utils/index';

function MenuDetail() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [menu, setMenu] = useState<MenuInfo | null | undefined>(null);
  const [type, setType] = useState<Type>('hot');
  const [size, setSize] = useState<Size>('tall');
  const [options, setOptions] = useState<Options>({});
  const { menuId } = useParams();
  const navigate = useNavigate();

  /**
   * 상단의 뒤로가기 버튼 클릭 시, 메뉴 목록 페이지로 이동
   */
  const handleClickBack = () => {
    navigate(-1);
  };

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
  const handleClickOrder = (event: React.MouseEvent<HTMLButtonElement>) => {};

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
   * 메뉴 정보 렌더링 (Memorize)
   */
  const MenuInfo = useMemo(() => {
    if (!menu) return;

    return (
      <>
        <Img
          src="https://www.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg"
          alt="음료"
        />
        <MenuInfoContainer>
          <h2>{menu.name}</h2>
          <p className="description">{menu.thumbnail}</p>
          <p className="price">{getPriceComma(menu.price)}원</p>
        </MenuInfoContainer>
      </>
    );
  }, [menu]);

  return (
    <Container>
      {menu === null ? (
        <p>Loading...</p>
      ) : menu === undefined ? (
        <p>데이터 조회 오류</p>
      ) : (
        <>
          <BackArrow onClick={handleClickBack}>{'<'}</BackArrow>
          {MenuInfo}
          <TypeSelector type={type} onClick={handleClickType} />
          <SizeSelector size={size} onClick={handleClickSize} />
          {menu.options.length > 0 && (
            <OptionSelector
              onClick={handleClickOption}
              options={menu.options}
            />
          )}
          <button type="button" onClick={handleClickOrder}>
            주문하기
          </button>
        </>
      )}
    </Container>
  );
}

export default MenuDetail;
