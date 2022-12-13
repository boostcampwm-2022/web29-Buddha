import { QUERY_KEYS } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { customFetch } from '@/utils/fetch';
import { useEffect, useState } from 'react';
import { OrderStatusCode } from '@/types';

function useOrderStatus(orderId: string) {
  const [status, setStatus] = useState<OrderStatusCode>('REQUESTED');

  const { data } = useQuery(
    [QUERY_KEYS.ORDER_STATUS, orderId],
    async () => {
      const res = await customFetch({ url: `/order/${orderId}`, method: 'GET' });
      return res.data;
    },
    {
      refetchInterval: 5000,
    },
  );

  useEffect(() => {
    if(data){
      setStatus(data.order_status);
    }
  }, [status, data]);

  return status;
}

export default useOrderStatus;
