import { createContext, ReactNode, useContext, useReducer } from 'react';

import { MenuInfo, Options, Size, Temperature } from '@/types';

interface State {
  menu: MenuInfo | null;
  count: number;
  temperature: Temperature;
  size: Size;
  options: Options;
  price: number;
}

const initialState: State = {
  menu: null,
  count: 1,
  temperature: 'hot',
  size: 'tall',
  options: {},
  price: 0,
};

type Dispatch = React.Dispatch<Action>;
type Action =
  | { type: 'SET_MENU'; menu: MenuInfo }
  | { type: 'SET_COUNT'; count: number }
  | { type: 'SET_TEMPERATURE'; temperature: Temperature }
  | { type: 'SET_SIZE'; size: Size }
  | { type: 'SET_OPTIONS'; options: Options }
  | { type: 'SET_PRICE'; price: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MENU':
      return { ...state, menu: action.menu };
    case 'SET_COUNT':
      return { ...state, count: action.count };
    case 'SET_TEMPERATURE':
      return { ...state, temperature: action.temperature };
    case 'SET_SIZE':
      return { ...state, size: action.size };
    case 'SET_OPTIONS':
      return { ...state, options: action.options };
    case 'SET_PRICE':
      return { ...state, price: action.price };
    default:
      return state;
  }
}

export const MenuDetailStateContext = createContext<State | null>(null);
export const MenuDetailActionContext = createContext<Dispatch | null>(null);

export const useMenuDetailState = function () {
  const state = useContext(MenuDetailStateContext);
  if (!state) throw new Error('State is NULL');
  return state;
};

export function useMenuDetailDispatch() {
  const dispatch = useContext(MenuDetailActionContext);
  if (!dispatch) throw new Error('Dispatch is NULL');
  return dispatch;
}

function MenuDetailContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MenuDetailStateContext.Provider value={state}>
      <MenuDetailActionContext.Provider value={dispatch}>
        {children}
      </MenuDetailActionContext.Provider>
    </MenuDetailStateContext.Provider>
  );
}

export default MenuDetailContextProvider;
