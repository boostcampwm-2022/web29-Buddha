import HistoryByDate from '@/components/HistoryByDate';
import useFetch from '@/hooks/useFetch';
import useListByDate from '@/hooks/useListByDate';
import { useMemo } from 'react';
import { Container } from './styled';

function RequestList() {
  const { jsonData: requestedList } = useFetch({
    url: '/order/requested',
    method: 'get',
  });
  const { listByDate } = useListByDate({ list: requestedList.orders });

  const ListByDateContainers = useMemo(() => {
    return Object.keys(listByDate).map((date) => (
      <HistoryByDate date={date} history={listByDate[date]} key={date} />
    ));
  }, [listByDate]);

  return <Container>{ListByDateContainers}</Container>;
}

export default RequestList;
