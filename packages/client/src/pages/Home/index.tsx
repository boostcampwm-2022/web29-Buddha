import { useRecoilValue } from 'recoil';

import OrderList from './components/OrderList';
import RequestList from './components/RequestList';
import Footer from 'components/Footer';
import Header from 'components/Header';

import { userRoleState } from 'utils/store';
import { Container } from './styled';

function Home() {
  const userRole = useRecoilValue(userRoleState);

  return (
    <Container>
      <Header title="주문내역" />
      {userRole === 'CLIENT' ? <OrderList /> : <RequestList />}
      <Footer />
    </Container>
  );
}

export default Home;
