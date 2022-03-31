import { getMenus } from "@/firebase/menu";
import { ActionContext } from "vuex";
import { IMenuStore } from "./types";

export default {
  getMenusAsync: async (state: ActionContext<IMenuStore, any>) => {
    const menus = await getMenus();
    console.log(menus);
    state.commit("setMenus", menus);
    return null;
  },
};
