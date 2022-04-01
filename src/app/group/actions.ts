import {
  getGroups,
  createGroup,
  deleteGroup,
  participateInGroup,
  comeOutFromGroup,
} from "@/firebase/group";
import { ActionContext } from "vuex";
import { IGroupPayload, IGroupStore } from "./types";

export default {
  getGroupsAsync: async (state: ActionContext<IGroupStore, any>) => {
    try {
      const groups = await getGroups();
      state.commit("setGroups", groups);
      return groups;
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      console.log(e);
      return;
    }
  },

  participateInGroupAsync: async (
    state: ActionContext<IGroupStore, any>,
    id: string
  ) => {
    try {
      const currentUser = state.rootGetters["UserStore/getCurrentUser"];
      const currentUserId = currentUser.uid;
      if (currentUserId === "") throw new Error("Not Logged In");

      state.commit("participateInGroup", { currentUserId, groupId: id });
      await participateInGroup(id);
    } catch (e) {
      console.log(e);
      return;
    }
  },

  comeOutFromGroupAsync: async (
    state: ActionContext<IGroupStore, any>,
    id: string
  ) => {
    try {
      const currentUser = state.rootGetters["UserStore/getCurrentUser"];
      const currentUserId = currentUser.uid;
      if (currentUserId === "") throw new Error("Not Logged In");

      state.commit("comeOutFromGroup", { currentUserId, groupId: id });
      await comeOutFromGroup(id);
    } catch (e) {
      console.log(e);
      return;
    }
  },
};
