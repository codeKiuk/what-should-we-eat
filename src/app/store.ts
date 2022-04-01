import { createStore } from "vuex";
import UserStore from "./user/store";
import GroupStore from "./group/store";
import MenuStore from "./menu/store";
import { IUserStore } from "./user/types";
import { IGroupStore } from "./group/types";
import { IMenuStore } from "./menu/types";

export interface IRootStore {
  UserStore: IUserStore;
  GroupStore: IGroupStore;
  MenuStore: IMenuStore;
}

const store = createStore({
  modules: { UserStore, GroupStore, MenuStore },
});

export default store;
