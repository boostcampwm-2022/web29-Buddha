import { QUERY_KEYS } from '@/constants';
import { UserRole } from '@/types';
import { customFetch } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';

interface Params {
  userRole: UserRole;
  url: string;
}

function useFetchOrderList({ userRole, url }: Params) {
  const queryResponse = useQuery(
    [QUERY_KEYS.ORDER_LIST],
    async () => {
      const res = await customFetch({ url, method: 'GET' });
      return res.data;
    },
    {
      refetchInterval: 2000,
    }
  );

  return queryResponse;
}

export default useFetchOrderList;
