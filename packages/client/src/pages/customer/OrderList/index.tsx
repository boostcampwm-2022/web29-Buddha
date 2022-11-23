import Header from 'components/Header';
import Footer from 'components/Footer';

import { Container } from './styled';
import HistoryContainer from 'containers/HistoryContainer';

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
