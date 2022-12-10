import { Route, Routes } from 'react-router-dom';

import Signup from 'pages/Signup';
import Signin from 'pages/Signin';
import MenuList from 'pages/customer/MenuList';
import MenuDetail from 'pages/customer/MenuDetail';
import Cart from 'pages/customer/Cart';
import MyPage from 'pages/MyPage';
import Home from './pages/Home';
import AcceptList from './pages/manager/AcceptList';
import OrderStatus from './pages/customer/OrderStatus';
import { userRoleState } from '@/stores';
import { useRecoilValue } from 'recoil';

function Router() {
  const userRole = useRecoilValue(userRoleState);

  return (
    <Routes>
      {/* 비인가 사용자 */}

      {userRole === 'UNAUTH' && (
        <>
          <Route path={'/'} element={<Signin />} />
          <Route path={'/signup'} element={<Signup />} />
        </>
      )}

      {/* 인가 사용자 */}
      {userRole !== 'UNAUTH' && (
        <>
          <Route path={'/'} element={<Home />} />
          <Route path={'/mypage'} element={<MyPage />} />
        </>
      )}

      {/* 고객용 */}
      {userRole === 'CLIENT' && (
        <>
          <Route path={'/order/:orderId'} element={<OrderStatus />} />
          <Route path={'/menu'} element={<MenuList />} />
          <Route path={'/menu/:menuId'} element={<MenuDetail />} />
          <Route path={'/cart'} element={<Cart />} />
        </>
      )}

      {/* 업주용 */}
      {userRole === 'MANAGER' && (
        <>
          <Route path={'/manager/accept'} element={<AcceptList />} />
        </>
      )}

      {/* 404 Error */}
      <Route path={'*'} element={<div>404 ERROR</div>} />
    </Routes>
  );
}

export default Router;
