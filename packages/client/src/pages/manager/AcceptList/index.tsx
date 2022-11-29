import OrderDateList from 'components/OrderDateList';
import Footer from 'components/Footer';
import Header from 'components/Header';

import useFetch from 'hooks/useFetch';
import { Container } from './styled';

function AcceptList() {
  const { jsonData: list } = useFetch({
    url: '/order/accepted',
    method: 'get',
  });

  return (
    <Container>
      <Header title="주문 수락 내역" />
      {list.orders && <OrderDateList list={list.orders} />}
      <Footer />
    </Container>
  );
}

export default AcceptList;
