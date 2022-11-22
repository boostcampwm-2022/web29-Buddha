import { Route, Routes } from 'react-router-dom';

import Signup from 'pages/Signup';
import Signin from 'pages/Signin';
import OrderList from 'pages/customer/OrderList';
import MenuList from 'pages/MenuList';
import MenuDetail from 'pages/customer/MenuDetail';


function Router() {
  return (
    <Routes>
      <Route path={'/'} element={<Signin />}></Route> {/* 로그인 */}
      <Route path={'/signup'} element={<Signup />}></Route> {/* 회원가입 */}
      <Route path={'/mypage'} element={<></>}></Route> {/* 마이페이지 */}
      <Route path={'/home'} element={<OrderList />}></Route> {/* 고객 메인 */}
      <Route path={'/menu'} element={<MenuList />}></Route>{' '}
      {/* 고객 메뉴 목록 */}
      <Route path={'/menu/:menuId'} element={<MenuDetail />}></Route>{' '}
      {/* 고객 메뉴 상세 */}
      <Route path={'/cart'} element={<></>}></Route> {/* 고객 장바구니 */}
      {/* 업주 (전역 상태 관리로 고객과 함께 사용 가능) */}
      <Route path={'/owner/home'} element={<></>}></Route>
      <Route path={'/owner/order'} element={<></>}></Route>
      <Route path={'*'} element={<></>}></Route> {/* 에러 (404) */}
    </Routes>
  );
}

export default Router;
