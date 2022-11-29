import axios from 'axios';
import { useEffect, useState } from 'react';

interface Params {
  url: string;
  method: 'get' | 'post';
  data?: {};
}

function useFetch({ url, method, data }: Params) {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;
  const [jsonData, setJsonData] = useState<any>({});

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
        alert('오류가 발생했습니다.\n다시 시도해주세요.');
      }
    };
    fetch();
  }, [api, url, method, data]);

  return { jsonData };
}

export default useFetch;
