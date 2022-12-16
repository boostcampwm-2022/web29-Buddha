import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import LeftArrow from 'components/LeftArrow';
import Footer from 'components/Footer';

import { PROGRESS_CLASS, PROGRESS_IMAGE } from '@/constants';
import useOrderStatus from '@/hooks/useOrderStatus';
import {
  ContentWrapper,
  HeaderWrapper,
  ImageContainer,
  OrderInformationContainer,
  OrderInformationText,
  OrderStatusWrapper,
  Progress,
  ProgressBar,
  StatusBar,
} from './styled';
import { OrderDetailMenu, OrderStatusCode } from '@/types';

interface OrderInformationProps {
  id: number;
  status: OrderStatusCode;
  menus: OrderDetailMenu[];
}

function OrderInfomation({ status, id, menus }: OrderInformationProps) {
  const menuLength = useMemo(() => menus.length, [menus]);

  return (
    <OrderInformationContainer>
      {status === 'REJECTED' ? (
        <p>거절된 주문입니다.</p>
      ) : (
        <>
          <p>주문 번호 : {id}</p>
          <OrderInformationText>
            {menus[0]?.name}
            {menuLength > 1 && ` 외 ${menuLength - 1}개`}
          </OrderInformationText>
        </>
      )}
    </OrderInformationContainer>
  );
}

function OrderStatus() {
  const { orderId } = useParams();
  const { status, id, menus } = useOrderStatus(orderId ? orderId : '');

  return (
    <OrderStatusWrapper data-testid="order-status-page">
      <HeaderWrapper>
        <LeftArrow color={'black'} left={0.5} top={0.5} />
        <p className={'title'}>주문 현황</p>
      </HeaderWrapper>
      <OrderInfomation status={status} id={id} menus={menus} />
      <ContentWrapper>
        <StatusBar data-testid={'status-bar'}>
          <ProgressBar
            data-testid={status}
            className={PROGRESS_CLASS[status]}
          />
        </StatusBar>
        <Progress>
          <p>주문 요청</p>
          <p>제조 중</p>
          <p>제조 완료</p>
        </Progress>
        <ImageContainer>
          <img
            src={PROGRESS_IMAGE[status]}
            alt={`${status} 움짤`}
            width={180}
            height={180}
          />
        </ImageContainer>
      </ContentWrapper>
      <Footer />
    </OrderStatusWrapper>
  );
}

export default OrderStatus;
