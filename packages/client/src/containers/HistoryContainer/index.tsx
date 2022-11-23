import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import HistoryByDate from 'containers/HistoryByDate';

import { orderListData } from '@/mocks/data/order';
import { History } from 'types/OrderList';
import { Container } from './styled';

function HistoryContainer() {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [history, setHistory] = useState<History[] | null>(null);

  /**
   * 유저의 주문 내역 조회
   */
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(`${api}/order`, { withCredentials: true });
        setHistory(res.data);
      } catch (err) {
        alert('데이터 조회에 문제가 발생했습니다.');
      }
    };

    setHistory([...orderListData]);
    // getHistoryList();
  }, [api]);

  /**
   * 모든 주문 내역을 날짜별 주문 내역으로 그룹화
   */
  const historyByDate = useMemo(() => {
    if (!history) return {};

    return history.reduce((prev: { [key: string]: History[] }, curr) => {
      const date = curr.date;

      if (!prev[date]) return { ...prev, [date]: [{ ...curr }] };
      else return { ...prev, [date]: [...prev[date], { ...curr }] };
    }, {});
  }, [history]);

  /**
   * 주문 내역의 날짜들 리스트
   */
  const dates = useMemo(() => Object.keys(historyByDate), [historyByDate]);

  /**
   * 날짜별 내역 컨터이너들 생성
   */
  const HistoryByDateContainers = useMemo(() => {
    return dates.map((date) => (
      <HistoryByDate date={date} history={historyByDate[date]} key={date} />
    ));
  }, [dates, historyByDate]);

  return <Container>{HistoryByDateContainers}</Container>;
}

export default HistoryContainer;
