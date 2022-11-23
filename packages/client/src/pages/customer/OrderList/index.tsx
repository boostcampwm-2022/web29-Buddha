import { useEffect, useState } from 'react';

import Header from 'components/Header';
import { Container } from './styled';
import Footer from '@/components/Footer';

import axios from 'axios';
import { OrderListHistory } from 'types/OrderList';
import { orderListData } from '@/mocks/data/order';
import HistoryList from '@/containers/HistoryList';
// import { ReactComponent as Cart } from 'icons/cart.svg';

function OrderList() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [orderList, setOrderList] = useState<OrderListHistory[] | null>(null);

  /**
   * 주문 리스트 조회
   */
  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const res = await axios.get(`${api}/order`);
        setOrderList(res.data);
      } catch (err) {
        alert('데이터 조회에 문제가 발생했습니다.');
      }
    };

    setOrderList([...orderListData]);
    // getOrderHistory();
  }, [api]);

  return (
    <Container>
      <Header title="주문내역" />
      <HistoryList />
      <Footer />
    </Container>
  );
}

export default OrderList;
