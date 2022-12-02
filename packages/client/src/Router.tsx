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

function Router() {
  return (
    <Routes>
      <Route path={'/'} element={<Signin />}></Route> {/* 로그인 */}
      <Route path={'/signup'} element={<Signup />}></Route> {/* 회원가입 */}
      <Route path={'/mypage'} element={<MyPage />}></Route> {/* 마이페이지 */}
      <Route path={'/home'} element={<Home />}></Route> {/* 고객 메인 */}
      <Route path={'/order/:orderId'} element={<OrderStatus />}></Route>{' '}
      {/* 주문 현황 */}
      <Route path={'/menu'} element={<MenuList />}></Route>{' '}
      {/* 고객 메뉴 목록 */}
      <Route path={'/menu/:menuId'} element={<MenuDetail />}></Route>{' '}
      {/* 고객 메뉴 상세 */}
      <Route path={'/cart'} element={<Cart />}></Route> {/* 고객 장바구니 */}
      <Route path={'/manager/accept'} element={<AcceptList />}></Route>
      <Route path={'*'} element={<></>}></Route> {/* 에러 (404) */}
    </Routes>
  );
}

export default Router;
