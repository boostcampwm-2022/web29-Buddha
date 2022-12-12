import { useEffect, useState } from 'react';

import { AnyObject, Order, OrderStatusCode } from '@/types';

interface Params {
  list: Order[];
  status?: OrderStatusCode[];
}

const d = new Date();

function useOrderGroup({ list, status }: Params) {
  const [orderGroup, setOrderGroup] = useState<AnyObject>({});
  const [today] = useState(
    `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  );

  useEffect(() => {
    if (!list || !status) return;

    let result;

    if (!status.includes('COMPLETED')) {
      result = list.reduce((prev: AnyObject, curr) => {
        const currStatus = curr.status;

        if (!status.includes(currStatus)) {
          return { ...prev };
        }
        return {
          ...prev,
          '현재 주문 상태': [{ ...curr }, ...(prev['현재 주문 상태'] ?? [])],
        };
      }, {});
    } else {
      result = list.reduce((prev: AnyObject, curr) => {
        const date = curr.date.slice(0, 10);
        const day = curr.date.slice(17, 18);

        const key = date === today ? '오늘' : `${date} (${day})`;

        if (curr.status === 'COMPLETED') {
          return { ...prev, [key]: [{ ...curr }, ...(prev[key] ?? [])] };
        }
        return { ...prev };
      }, {});
    }

    setOrderGroup({ ...result });
  }, [list, status, today]);

  return { orderGroup };
}

export default useOrderGroup;
