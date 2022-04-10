import { IMenu } from "../menu/types";
import { IRootStore } from "../store";
import { IGroupStore } from "./types";

export default {
  getGroups: (state: IGroupStore) => state.groups,

  getGroupsJoin: (state: IGroupStore, getters: any, rootState: IRootStore) => {
    if (!rootState.UserStore.users || !rootState.MenuStore.menus) return;

    const users = rootState.UserStore.users;
    const menus = rootState.MenuStore.menus;

    const groupsJoin = state.groups.map((group) => ({
      ...group,
      lead: users.find((user) => user.uid === group.lead) || group.lead,
      users: group.users.map((uid) => users.find((user) => user.uid === uid)),
      menu: menus.find((menu: IMenu) => menu.id === group.menu),
    }));

    return groupsJoin;
  },
};
