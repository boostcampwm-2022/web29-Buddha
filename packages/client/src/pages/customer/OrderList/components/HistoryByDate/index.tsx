import { useMemo } from 'react';

import HistoryItem from '@/pages/customer/OrderList/components/HistoryItem';

import { History } from 'types/OrderList';
import { Container } from './styled';

interface Props {
  date: string;
  history: History[];
}

function HistoryByDate({ date, history }: Props) {
  const historyItems = useMemo(
    () => history.map((h) => <HistoryItem history={h} key={h.id} />),
    [history]
  );

  return (
    <Container>
      <p>{date}</p>
      {historyItems}
    </Container>
  );
}

export default HistoryByDate;
