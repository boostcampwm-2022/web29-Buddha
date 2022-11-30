import { useEffect, useState } from 'react';

import { AnyObject, Order, OrderStatus } from '@/types';

interface Params {
  list: Order[];
  status?: OrderStatus[];
}

function useOrderGroup({ list, status }: Params) {
  const [orderGroup, setOrderGroup] = useState<AnyObject>({});

  useEffect(() => {
    if (!list) return;

    let result;

    if (status) {
      result = list.reduce((prev: AnyObject, curr) => {
        const currStatus = curr.status;

        if (!status.includes(currStatus)) {
          return { ...prev };
        } else if (prev['현재 주문 상태']) {
          return {
            ...prev,
            '현재 주문 상태': [...prev['현재 주문 상태'], { ...curr }],
          };
        } else {
          return { ...prev, '현재 주문 상태': [{ ...curr }] };
        }
      }, {});
    } else {
      result = list.reduce((prev: AnyObject, curr) => {
        const date = curr.date.slice(0, 10);
        // const time = curr.date.slice(11, 19);

        if (!prev[date]) return { ...prev, [date]: [{ ...curr }] };
        else return { ...prev, [date]: [...prev[date], { ...curr }] };
      }, {});
    }

    setOrderGroup({ ...result });
  }, [list]);

  return { orderGroup };
}

export default useOrderGroup;
