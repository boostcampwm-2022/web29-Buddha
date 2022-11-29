import { useMemo } from 'react';

import HistoryItem from '@/components/HistoryItem';

import { History } from 'types/OrderList';
import { Container } from './styled';

interface Props {
  date: string;
  history: History[];
}

/**
 * 날짜별 내역 목록 컨테이너
 */
function HistoryByDate({ date, history }: Props) {
  const historyItems = useMemo(
    () =>
      history.map((h) => <HistoryItem date={date} history={h} key={h.id} />),
    [history, date]
  );

  return (
    <Container>
      <p>{date}</p>
      {historyItems}
    </Container>
  );
}

export default HistoryByDate;
