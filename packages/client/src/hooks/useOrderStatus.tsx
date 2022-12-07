import { QUERY_KEYS } from '@/constants';
import useCustomQuery from './useCustomQuery';

function useOrderStatus(orderId: string) {
  const data = useCustomQuery({
    queryKey: [QUERY_KEYS.ORDER_STATUS, orderId],
    url: `/order/${orderId}`,
    options: {
      refetchInterval: 5000,
    },
  });

  if (data) return data.data.order_status;
  return 'REQUESTED';
}

export default useOrderStatus;
