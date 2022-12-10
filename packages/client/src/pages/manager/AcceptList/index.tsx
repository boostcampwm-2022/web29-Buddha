import { useQuery } from '@tanstack/react-query';

import OrderDateList from 'components/OrderDateList';
import Footer from 'components/Footer';
import Header from 'components/Header';

import { QUERY_KEYS } from '@/constants';
import { customFetch } from '@/utils/fetch';
import { Container } from './styled';

function AcceptList() {
  const { data: list = {} } = useQuery([QUERY_KEYS.ACCEPTED_LIST], async () => {
    const res = await customFetch({ url: '/order/accepted', method: 'GET' });
    return res.data;
  });

  return (
    <Container>
      <Header title="주문 수락 내역" />
      {list.orders && (
        <OrderDateList list={list.orders} status={['ACCEPTED']} />
      )}
      <Footer />
    </Container>
  );
}

export default AcceptList;
