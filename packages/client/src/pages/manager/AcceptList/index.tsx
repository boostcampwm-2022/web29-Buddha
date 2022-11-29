import HistoryByDate from '@/components/HistoryByDate';
import useFetch from '@/hooks/useFetch';
import useListByDate from '@/hooks/useListByDate';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { useMemo } from 'react';

import { Container } from './styled';

function AcceptList() {
  const { jsonData: acceptList } = useFetch({
    url: '/order/accepted',
    method: 'get',
  });
  const { listByDate } = useListByDate({ list: acceptList.orders });

  const ListByDateContainers = useMemo(() => {
    return Object.keys(listByDate).map((date) => (
      <HistoryByDate date={date} history={listByDate[date]} key={date} />
    ));
  }, [listByDate]);

  return (
    <Container>
      <Header title="주문 수락 내역" />
      {ListByDateContainers}
      <Footer />
    </Container>
  );
}

export default AcceptList;
