import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { IMenuStore } from "./types";

const MenuStore = {
  namespaced: true,
  state: () => ({} as IMenuStore),
  getters,
  mutations,
  actions,
};

export default MenuStore;
