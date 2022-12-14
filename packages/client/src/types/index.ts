// Type
export type APIMethod = 'GET' | 'get' | 'POST' | 'post';
export type UserRole = 'CLIENT' | 'MANAGER' | 'UNAUTH';
export type Temperature = 'hot' | 'iced';
export type Size = 'tall' | 'grande' | 'venti';
export type OrderStatusCode =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COMPLETED';
export type AnyObject = { [key: string]: any };

// Signin.ts
export interface ChkUser {
  code: string;
  state: string;
}

// signup.ts
// 확인 필요
export interface SignupRequestBody {
  userRole: UserRole;
  nickname: string;
  corporate?: string;
}

// cart.ts
export interface CartMenu {
  id: number;
  name: string;
  type: string;
  size: string;
  count: number;
  price: number;
  thumbnail: string;
  options: MenuOption[];
}

export interface MenuOption {
  id: number;
  name: string;
  price: number;
  category: string;
}

// menulist.ts
export interface Menu {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  category: string;
}

export interface CafeMenu {
  id: number;
  cafe_name: string;
  menus: Menu[];
}

// menudetail.ts
export interface MenuInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  options: Option[];
}

export interface Category {
  [key: string]: Option[];
}

export interface Option {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface Options {
  [key: string]: string | undefined;
}

// OrderDetailList.tsx
export interface OrderDetailMenu {
  id: number;
  name: string;
  options: any;
  price: number;
  count?: number;
  thumbnail?: string;
  type?: Temperature;
  size?: Size;
}

// OrderList.tsx
export interface Order {
  id: number;
  cafeId: number;
  date: string;
  menus: OrderDetailMenu[];
  status: OrderStatusCode;
}
