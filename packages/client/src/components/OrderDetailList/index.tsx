import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { OrderDetailMenu, OrderStatusCode } from '@/types';
import { getFirstUpper, getPriceComma } from '@/utils';
import {
  ButtonContainer,
  Container,
  DivisionLine,
  ItemContainer,
  OptionContainer,
  OptionText,
  PriceText,
} from './styled';
import { userRoleState } from '@/stores';
import Button from '../Button';

interface Props {
  date: string;
  menus: OrderDetailMenu[];
  status?: OrderStatusCode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ItemProps {
  date: string;
  menu: OrderDetailMenu;
}

interface ButtonGroupProps {
  status?: OrderStatusCode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonGroup({ status, onClick }: ButtonGroupProps) {
  return (
    <ButtonContainer>
      {status === 'REQUESTED' ? (
        <>
          <Button className="wd-fit" onClick={onClick}>
            수락
          </Button>
          <Button className="wd-fit" onClick={onClick}>
            거절
          </Button>
        </>
      ) : status === 'ACCEPTED' ? (
        <Button className="wd-fit" onClick={onClick}>
          제조 완료
        </Button>
      ) : (
        <></>
      )}
    </ButtonContainer>
  );
}

function OrderDetailItem({ date, menu }: ItemProps) {
  return (
    <>
      <div>
        <ItemContainer key={`${date}-${menu.id}`}>
          <p>
            {menu.name} {menu.count}잔
          </p>
          <PriceText>{`${getPriceComma(menu.price)} 원`}</PriceText>
        </ItemContainer>
        <OptionContainer>
          <OptionText>
            {(menu?.type ?? 'HOT').toUpperCase()} |{' '}
            {getFirstUpper(menu.size ?? 'Tall')}
          </OptionText>
          {Object.keys(menu.options).map((k) => (
            <OptionText key={menu.options[k]} isOption>
              {menu.options[k]}
            </OptionText>
          ))}
        </OptionContainer>
      </div>
    </>
  );
}

function OrderDetailList({ date, menus, status, onClick }: Props) {
  const userRole = useRecoilValue(userRoleState);
  console.log(menus);
  const totalPrice = useMemo(() => {
    return menus.reduce((prev, curr) => prev + curr.price, 0);
  }, [menus]);

  /**
   * 메뉴 종류별로
   */
  const items = menus.map((menu, idx) => (
    <OrderDetailItem
      date={date}
      menu={menu}
      key={`${date}-${menu.id}-${menu.id}-${idx}`}
    />
  ));

  return (
    <Container>
      {items}
      <DivisionLine />
      <ItemContainer>
        <p>총 액</p>
        <PriceText>{`${getPriceComma(totalPrice)} 원`}</PriceText>
      </ItemContainer>
      {userRole === 'MANAGER' && (
        <ButtonGroup status={status} onClick={onClick} />
      )}
    </Container>
  );
}

export default OrderDetailList;
