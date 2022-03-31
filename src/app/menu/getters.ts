import { IMenuStore } from "./types";

export default {
  getMenus: (state: IMenuStore) => state.menus,
};
