import { useQuery } from '@tanstack/react-query';
import { customFetch } from 'utils/fetch';

interface CustomQueryParams {
  queryKey: string;
  url: string;
}

function useCustomQuery({ queryKey, url }: CustomQueryParams) {
  const { isSuccess, isError, data, error } = useQuery(
    [queryKey],
    async () => await customFetch({ url, method: 'GET' })
  );

  if(isSuccess) return data;
  if(isError) {
    console.log(error);
  }
  return;
}

export default useCustomQuery;
