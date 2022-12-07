import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios, { AxiosError } from 'axios';

import Signup from 'pages/Signup';
import Signin from 'pages/Signin';
import MenuList from 'pages/customer/MenuList';
import MenuDetail from 'pages/customer/MenuDetail';
import Cart from 'pages/customer/Cart';
import MyPage from 'pages/MyPage';
import Home from './pages/Home';
import AcceptList from './pages/manager/AcceptList';
import OrderStatus from './pages/customer/OrderStatus';
import { userRoleState } from '@/utils/store';
import { useRecoilState } from 'recoil';

function Router() {
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  const api = process.env.REACT_APP_API_SERVER_BASE_URL;

  const fetchUserRole = async () => {
    try{
      const res = await axios.get(`${api}/auth`, {
        withCredentials: true,
      });
      setUserRole(res.data.role);
    }catch(err){
      const error = err as AxiosError;

      if(error.response?.status === 401) {
        setUserRole('UNAUTH');
      }
    }
  }

  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <Routes>
      {userRole === 'UNAUTH' && <Route path={'/'} element={<Signin />}></Route>}

      {userRole === 'CLIENT' && <Route path={'/'} element={<Home />}></Route>}
      {userRole === 'MANAGER' && <Route path={'/'} element={<Home />}></Route>}

      {userRole !== 'UNAUTH' && <Route path={'/home'} element={<Home />}></Route>}

      <Route path={'/signup'} element={<Signup />}></Route>
      <Route path={'/mypage'} element={<MyPage />}></Route>
      <Route path={'/order/:orderId'} element={<OrderStatus />}></Route>
      <Route path={'/menu'} element={<MenuList />}></Route>
      <Route path={'/menu/:menuId'} element={<MenuDetail />}></Route>
      <Route path={'/cart'} element={<Cart />}></Route>
      <Route path={'/manager/accept'} element={<AcceptList />}></Route>
      <Route path={'*'} element={<></>}></Route>
    </Routes>
  );
}

export default Router;
