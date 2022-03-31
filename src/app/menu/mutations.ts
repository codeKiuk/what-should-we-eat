import { IMenu, IMenuStore } from "./types";

export default {
  setMenus: (state: IMenuStore, menus: IMenu[]) => {
    state.menus = menus;
  },
};
