export interface CartMenu {
  id: number;
  name: string;
  type: string;
  size: string;
  quantity: number;
  price: number;
  options: MenuOption[];
}

interface MenuOption {
  id: number;
  name: string;
  price: number;
  category: string;
}
