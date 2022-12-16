import { toastMessageState } from '@/stores';
import { AnyObject, APIMethod } from '@/types';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface Params {
  url: string;
  method: APIMethod;
  data?: AnyObject;
}

function useFetch({ url, method, data }: Params) {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const setToastMessage = useSetRecoilState(toastMessageState);
  const [jsonData, setJsonData] = useState<AnyObject>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!api || !method || !url) return;

    const fetch = async () => {
      try {
        const res = await axios({
          method,
          url: `${api}${url}`,
          data: method !== 'get' && data,
          withCredentials: true,
        });

        setJsonData(res.data);
      } catch (err) {
        const { response } = err as AxiosError;

        if (response?.status === 401) {
          navigate('/');
        }
        setToastMessage('오류가 발생했습니다.\n다시 시도해주세요.');
      }
    };
    fetch();
  }, [api, url, method, data, navigate, setToastMessage]);

  return { jsonData };
}

export default useFetch;
