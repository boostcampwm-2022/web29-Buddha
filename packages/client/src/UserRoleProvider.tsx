import { ReactNode, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { userRoleState } from '@/utils/store';

interface Props {
  children: ReactNode;
}

function UserRoleProvider({ children }: Props) {
  const setUserRole = useSetRecoilState(userRoleState);
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;

  const fetchUserRole = async () => {
    try {
      const res = await axios.get(`${api}/auth`, {
        withCredentials: true,
      });
      setUserRole(res.data.role);
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 401) {
        setUserRole('UNAUTH');
      }
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  return <>{children}</>;
}

export default UserRoleProvider;
