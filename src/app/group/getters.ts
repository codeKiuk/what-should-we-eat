import { IGroupStore } from "./types";

export default {
  getMenus: (state: IGroupStore) => state.groups,
};
