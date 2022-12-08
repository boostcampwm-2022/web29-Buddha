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
import { useRecoilValue } from 'recoil';

function Router() {
  const userRole = useRecoilValue(userRoleState);

  return (
    <Routes>
      {/* 비인가 사용자 */}
      {userRole === 'UNAUTH' && <Route path={'/'} element={<Signin />}></Route>}
      {userRole === 'UNAUTH' && <Route path={'/signup'} element={<Signup />}></Route>}
      
      {/* 인가 사용자 */}
      {userRole !== 'UNAUTH' && <Route path={'/'} element={<Home />}></Route>}
      {userRole !== 'UNAUTH' && <Route path={'/mypage'} element={<MyPage />}></Route>}

      {/* 고객용 */}
      {userRole === 'CLIENT' && <Route path={'/order/:orderId'} element={<OrderStatus />}></Route>}
      {userRole === 'CLIENT' && <Route path={'/menu'} element={<MenuList />}></Route>}
      {userRole === 'CLIENT' && <Route path={'/menu/:menuId'} element={<MenuDetail />}></Route>}
      {userRole === 'CLIENT' && <Route path={'/cart'} element={<Cart />}></Route>}

      {/* 업주용 */}
      {userRole === 'MANAGER' && <Route path={'/manager/accept'} element={<AcceptList />}></Route>}

      {/* 404 Error */}
      <Route path={'*'} element={<div>접근안돼요 ㅎㅎ</div>}></Route>
    </Routes>
  );
}

export default Router;
