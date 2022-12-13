import { useParams } from 'react-router-dom';
import LeftArrow from '@/components/LeftArrow';
import {
  ContentWrapper,
  HeaderWrapper,
  ImageContainer,
  OrderStatusWrapper,
  Progress,
  ProgressBar,
  StatusBar,
} from './styled';
import Footer from '@/components/Footer';
import { PROGRESS_CLASS, PROGRESS_IMAGE } from '@/constants';
import useOrderStatus from '@/hooks/useOrderStatus';

function OrderStatus() {
  const { orderId } = useParams();
  const status = useOrderStatus(orderId ? orderId : '');

  return (
    <OrderStatusWrapper data-testid="order-status-page">
      <HeaderWrapper>
        <LeftArrow color={'black'} left={0.5} top={0.5} />
        <p className={'title'}>주문 현황</p>
      </HeaderWrapper>
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
