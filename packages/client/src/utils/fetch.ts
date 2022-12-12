import { AnyObject, APIMethod } from '@/types';
import axios from 'axios';

interface Params {
  url: string;
  method: APIMethod;
  data?: AnyObject;
}

export async function customFetch({ url, method, data }: Params) {
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;

  return await axios({
    method,
    url: `${api}${url}`,
    data: method !== 'get' && data,
    withCredentials: true,
  });
}
