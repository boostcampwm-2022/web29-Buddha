import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function OrderStatus() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const { orderId } = useParams();
  const [status, setStatus] = useState<'REQUESTED' | 'ACCEPTED' | 'COMPLETED'>(
    'REQUESTED'
  );

  const fetchOrderStatus = async () => {
    try {
      const res = await axios.get(`${api}/order/${orderId}`, {
        withCredentials: true,
      });
      setStatus(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //setStatus('ACCEPTED');
    //setStatus('COMPLETED');
    //fetchOrderStatus();
  }, []);

  return (
    <OrderStatusWrapper>
      <HeaderWrapper>
        <LeftArrow color={'black'} left={0.5} top={0.5} />
        <p className={'title'}>주문 현황</p>
      </HeaderWrapper>
      <ContentWrapper>
        <StatusBar>
          <ProgressBar className={PROGRESS_CLASS[status]} />
        </StatusBar>
        <Progress>
          <p>주문 요청</p>
          <p>제조 중</p>
          <p>제조 완료</p>
        </Progress>
        <ImageContainer>
          <img src={PROGRESS_IMAGE[status]} alt={`${status} 움짤`} />
        </ImageContainer>
      </ContentWrapper>
      <Footer />
    </OrderStatusWrapper>
  );
}

export default OrderStatus;
