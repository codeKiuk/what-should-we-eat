import { getGroups, createGroup } from "@/firebase/group";
import { ActionContext } from "vuex";
import { IGroupPayload, IGroupStore } from "./types";

export default {
  getGroupsAsync: async (state: ActionContext<IGroupStore, any>) => {
    const groups = await getGroups();
    state.commit("setGroups", groups);
    return groups;
  },

  createGroupAsync: async (
    state: ActionContext<IGroupStore, any>,
    newGroup: IGroupPayload
  ) => {
    const docRefId = await createGroup(newGroup);
    state.commit("createGroup", { id: docRefId, ...newGroup });
  },
};
