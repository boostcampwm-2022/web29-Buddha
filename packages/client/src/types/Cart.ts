export interface CartMenu {
  id: number;
  name: string;
  type: string;
  size: string;
  quantity: number;
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
