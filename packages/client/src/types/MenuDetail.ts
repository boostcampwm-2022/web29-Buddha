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

export type Type = 'hot' | 'iced';
export type Size = 'tall' | 'grande' | 'venti';
export interface Options {
  [key: string]: string | undefined;
}
