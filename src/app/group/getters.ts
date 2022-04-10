import { IMenu } from "../menu/types";
import { IRootStore } from "../store";
import { IGroupStore } from "./types";

export default {
  getGroups: (state: IGroupStore) => state.groups,

  getGroupsJoin: (state: IGroupStore, getters: any, rootState: IRootStore) => {
    const users = rootState.UserStore.users;
    const menus = rootState.MenuStore.menus;
    if (users.length === 0 || menus.length === 0) return;

    const groupsJoin = state.groups.map((group) => ({
      ...group,
      lead: users.find((user) => user.uid === group.lead) || group.lead,
      users: group.users.map((uid) => users.find((user) => user.uid === uid)),
      menu: menus.find((menu: IMenu) => menu.id === group.menu),
    }));

    return groupsJoin;
  },
};
