import { menus } from './menu.entity.mock';
import { options } from './option.entity.mock';

const menuOptionRelation = {
  1: [1, 2],
  2: [3],
  3: [1, 3],
  4: [2, 3],
};

export const mockMenuOptions = [];
Object.keys(menuOptionRelation).map((menuId) => {
  menuOptionRelation[menuId].map((optionId) => {
    const newId = Object.keys(mockMenuOptions).length + 1;
    mockMenuOptions.push({
      id: newId,
      menu: menus[menuId],
      option: options[optionId],
    });
  });
});
