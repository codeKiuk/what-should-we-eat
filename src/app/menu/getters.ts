import { storage } from "@/main";
import { getDownloadURL, ref } from "firebase/storage";
import { IMenu, IMenuStore } from "./types";

export default {
  getMenus: (state: IMenuStore) => state.menus,
};
