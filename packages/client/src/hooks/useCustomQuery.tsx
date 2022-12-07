import { useQuery } from '@tanstack/react-query';
import { customFetch } from 'utils/fetch';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface CustomQueryParams {
  queryKey: string;
  url: string;
}

function useCustomQuery({ queryKey, url }: CustomQueryParams) {
  const { isSuccess, data, error } = useQuery(
    [queryKey],
    async () => await customFetch({ url, method: 'GET' })
  );
  const navigate = useNavigate();

  if (isSuccess) return data;
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      navigate('/');
    }
    console.log(error);
  }
  return;
}

export default useCustomQuery;
