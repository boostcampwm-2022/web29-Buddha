import { useRecoilValue } from 'recoil';

import Footer from 'components/Footer';
import Header from 'components/Header';
import OrderDateList from 'components/OrderDateList';

import { userRoleState } from 'utils/store';
import { Container } from './styled';
import useFetch from '@/hooks/useFetch';

function Home() {
  const userRole = useRecoilValue(userRoleState);

  const { jsonData: list } = useFetch({
    url: userRole === 'CLIENT' ? '/order' : '/order/requested',
    method: 'get',
  });

  return (
    <Container>
      <Header title={userRole === 'CLIENT' ? '주문내역' : '주문 요청 내역'} />
      {list.orders && <OrderDateList list={list.orders} />}
      <Footer />
    </Container>
  );
}

export default Home;
