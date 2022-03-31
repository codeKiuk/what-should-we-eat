import { getGroups } from "@/firebase/group";
import { ActionContext } from "vuex";
import { IGroupStore } from "./types";

export default {
  getGroupsAsync: async (state: ActionContext<IGroupStore, any>) => {
    const groups = await getGroups();
    console.log(groups);
    state.commit("setGroups", groups);
    return groups;
  },

  //   getGroupAsync: () => {},
};
