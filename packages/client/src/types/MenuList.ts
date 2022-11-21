export interface Menu {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
}

export interface CafeMenu {
  id: number;
  cafe_name: string;
  menus: Menu[];
}