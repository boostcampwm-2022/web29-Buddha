import { MENU_SIZE, SIZE_PRICE } from '../enum/menuSize.enum';
import { MENU_TYPE } from '../enum/menuType.enum';
import { mockMenus } from './menu.entity.mock';
import { mockMenuOptionRelation } from './menuOptionRelation.mock';
import { mockOptions } from './option.entity.mock';
/**
 * @Menu
 */

export const getCorrectMenuId = () => {
  const menuIds = Object.keys(mockMenus);
  const randIdx = Math.floor(Math.random() * menuIds.length);
  return parseInt(menuIds[randIdx]);
};

export const getWrongMenuId = () => {
  return -1;
};

export const getCorrectMenuType = (menuId) => {
  return mockMenus[menuId].type;
};

export const getWorngMenuType = (menuId) => {
  const menuType = mockMenus[menuId].type;
  if (menuType === MENU_TYPE.HOT) return MENU_TYPE.ICED;
  if (menuType === MENU_TYPE.ICED) return MENU_TYPE.HOT;
};

export const getCorrectMenuPrice = (menuId) => {
  return mockMenus[menuId].price;
};

export const getWrongMenuPrice = (menuId) => {
  return mockMenus[menuId].price + 500;
};

export const getCorrectTotalPrice = (menuId, options, menuSize) => {
  const optionTotalPrice = options.reduce((sum, optionId) => {
    return sum + mockOptions[optionId].price;
  }, 0);
  return (
    mockMenus[menuId].price + optionTotalPrice + parseInt(SIZE_PRICE[menuSize])
  );
};

export const getCorrectOptions = (menuId) => {
  return mockMenuOptionRelation[menuId];
};

export const getWrongOptions = () => {
  return [-1, -2];
};

export const getMockMenuOptions = (menuIds: Array<number>) => {
  const mockMenuOptions = [];
  Object.keys(mockMenuOptionRelation).map((menuId) => {
    if (!menuIds.includes(parseInt(menuId))) return;
    mockMenuOptionRelation[menuId].map((optionId) => {
      const newId = Object.keys(mockMenuOptions).length + 1;
      mockMenuOptions.push({
        id: newId,
        menu: mockMenus[menuId],
        option: mockOptions[optionId],
      });
    });
  });
  return mockMenuOptions;
};
