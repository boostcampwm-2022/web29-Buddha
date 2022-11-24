export interface HistoryMenu {
  id: number;
  name: string;
  price: number;
  options: {}[];
}

export interface History {
  id: number;
  status: string;
  date: string;
  menus: HistoryMenu[];
}
