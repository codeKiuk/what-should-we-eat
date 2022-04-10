import { createMenu, getMenus } from "@/firebase/menu";
import { storage } from "@/main";
import { getDownloadURL, getMetadata, ref } from "firebase/storage";
import { ActionContext } from "vuex";
import { IMenuStore } from "./types";

export default {
  getMenusAsync: async (state: ActionContext<IMenuStore, any>) => {
    const menuRefs = await getMenus();
    const menus = await Promise.all(
      menuRefs.map(async (menuRef) => ({
        id: await (
          await getMetadata(ref(storage, menuRef.fullPath))
        ).customMetadata!.id,
        name: menuRef.name,
        imgSrc: await getDownloadURL(ref(storage, menuRef.fullPath)),
      }))
    );

    state.commit("setMenus", menus);
    return;
  },

  createMenuAsync: async (
    state: ActionContext<IMenuStore, any>,
    payload: { menuName: string; file: File }
  ) => {
    await createMenu(payload);
    state.dispatch("getMenusAsync");
    return;
  },
};
