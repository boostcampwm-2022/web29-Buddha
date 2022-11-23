import { useMemo } from 'react';

import HistoryItem from 'components/HistoryItem';

import { History } from 'types/OrderList';
import { Container } from './styled';

interface Props {
  date: string;
  history: History[];
}

function HistoryByDate({ date, history }: Props) {
  const historyItems = useMemo(
    () => history.map((h) => <HistoryItem history={h} />),
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
