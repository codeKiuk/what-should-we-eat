import { getGroups, createGroup, deleteGroup } from "@/firebase/group";
import { ActionContext } from "vuex";
import { IGroupPayload, IGroupStore } from "./types";

export default {
  getGroupsAsync: async (state: ActionContext<IGroupStore, any>) => {
    try {
      const groups = await getGroups();
      state.commit("setGroups", groups);
      return groups;
    } catch (e) {
      return [];
    }
  },

  createGroupAsync: async (
    state: ActionContext<IGroupStore, any>,
    newGroup: IGroupPayload
  ) => {
    try {
      const docRefId = await createGroup(newGroup);
      state.commit("createGroup", { id: docRefId, ...newGroup });
    } catch (e) {
      return;
    }
  },

  deleteGroupAsync: async (
    state: ActionContext<IGroupStore, any>,
    id: string
  ) => {
    try {
      await deleteGroup(id);
      state.commit("deleteGroup", id);
    } catch (e) {
      return;
    }
  },
};
