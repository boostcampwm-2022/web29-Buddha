import Header from 'components/Header';
import Footer from 'components/Footer';

import { Container } from './styled';
import HistoryContainer from '@/pages/customer/OrderList/components/HistoryContainer';

function OrderList() {
  return (
    <Container>
      <Header title="주문내역" />
      <HistoryContainer />
      <Footer />
    </Container>
  );
}

export default OrderList;
