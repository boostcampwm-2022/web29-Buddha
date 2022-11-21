import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BackArrow,
  Container,
  Img,
  MenuInfoContainer,
} from './styled';
import { MenuInfo, Size, Type } from 'types/MenuDetail';

function MenuDetail() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [menu, setMenu] = useState<MenuInfo | null | undefined>(null);
  const [type, setType] = useState<Type>('hot');
  const [size, setSize] = useState<Size>('tall');
  const { menuId } = useParams();

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
        <Img src="https://www.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg" />
        <MenuInfoContainer>
          <h2>{menu.name}</h2>
          <p className="description">{menu.thumbnail}</p>
          <p className="price">{menu.price}원</p>
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
          <BackArrow>{'<'}</BackArrow>
          {MenuInfo}
        </>
      )}
    </Container>
  );
}

export default MenuDetail;
