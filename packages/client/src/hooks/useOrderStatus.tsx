import { QUERY_KEYS } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { customFetch } from '@/utils/fetch';
import { useEffect, useState } from 'react';
import { OrderDetailMenu, OrderStatusCode } from '@/types';

interface Response {
  date: string;
  id: number;
  menus: OrderDetailMenu[];
  status: OrderStatusCode;
}

function useOrderStatus(orderId: string) {
  const [response, setResponse] = useState<Response>({
    status: 'REQUESTED',
    date: '',
    id: -1,
    menus: [],
  });

  const { data } = useQuery(
    [QUERY_KEYS.ORDER_STATUS, orderId],
    async () => {
      const res = await customFetch({
        url: `/order/${orderId}`,
        method: 'GET',
      });
      return res.data;
    },
    {
      refetchInterval: 5000,
    }
  );

  useEffect(() => {
    if (data) {
      setResponse({ ...data });
    }
  }, [data]);

  return response;
}

export default useOrderStatus;
