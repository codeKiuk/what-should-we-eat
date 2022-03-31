import { createStore } from "vuex";
import UserStore from "./user/store";
import GroupStore from "./group/store";
import { IUserStore } from "./user/types";
import { IGroupStore } from "./group/types";

export interface IRootStore {
  UserStore: IUserStore;
  GroupStore: IGroupStore;
}

const store = createStore({
  modules: { UserStore, GroupStore },
});

export default store;
