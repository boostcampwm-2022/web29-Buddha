import { useQuery } from '@tanstack/react-query';
import { customFetch } from 'utils/fetch';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { AnyObject } from '@/types';
import { userRoleState } from '@/stores';

interface CustomQueryParams {
  queryKey: string[];
  url: string;
  options?: AnyObject;
}

function useCustomQuery({ queryKey, url, options }: CustomQueryParams) {
  const navigate = useNavigate();
  const setUserRole = useSetRecoilState(userRoleState);

  const { isSuccess, data, error } = useQuery(
    queryKey,
    async () => await customFetch({ url, method: 'GET' }),
    { ...options }
  );

  if (isSuccess) return data;
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      setUserRole('UNAUTH');
      navigate('/');
    }
    console.log(error);
  }
  return;
}

export default useCustomQuery;
