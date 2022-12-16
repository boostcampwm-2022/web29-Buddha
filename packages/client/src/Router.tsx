import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import { userRoleState } from '@/stores';

const Signup = React.lazy(() => import('pages/Signup'));
const Signin = React.lazy(() => import('pages/Signin'));
const MenuList = React.lazy(() => import('pages/customer/MenuList'));
const MenuDetail = React.lazy(() => import('pages/customer/MenuDetail'));
const Cart = React.lazy(() => import('pages/customer/Cart'));
const MyPage = React.lazy(() => import('pages/MyPage'));
const Home = React.lazy(() => import('./pages/Home'));
const AcceptList = React.lazy(() => import('./pages/manager/AcceptList'));
const OrderStatus = React.lazy(() => import('./pages/customer/OrderStatus'));

function Router() {
  const userRole = useRecoilValue(userRoleState);

  return (
    <Suspense fallback={<p>loading...</p>}>
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
    </Suspense>
  );
}

export default Router;
