import { useRecoilValue } from 'recoil';

import Footer from 'components/Footer';
import Header from 'components/Header';
import OrderDateList from 'components/OrderDateList';

import { userRoleState } from '@/stores';
import { Container } from './styled';
import useFetchOrderList from '@/hooks/useFetchOrderList';

function Home() {
  const userRole = useRecoilValue(userRoleState);

  const { data: list = {} } = useFetchOrderList({
    userRole,
    url: userRole === 'CLIENT' ? '/order' : '/order/requested',
  });

  return (
    <Container>
      <Header title={userRole === 'CLIENT' ? '주문 내역' : '주문 요청 내역'} />
      {userRole === 'CLIENT' && (
        <OrderDateList list={list.orders} status={['REQUESTED', 'ACCEPTED']} />
      )}
      {list.orders && (
        <OrderDateList
          list={list.orders}
          status={userRole === 'CLIENT' ? ['COMPLETED'] : ['REQUESTED']}
        />
      )}
      <Footer />
    </Container>
  );
}

export default Home;
