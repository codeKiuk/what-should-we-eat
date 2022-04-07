import { Timestamp } from "firebase/firestore";
import { IGroup, IGroupPayload, IGroupStore } from "./types";
import { TWENTY_MIN_BY_MS } from "@/assets/constants/constants";

export default {
  setGroups: (state: IGroupStore, groups: IGroup[]) => {
    state.groups = groups;
  },

  createGroup: (
    state: IGroupStore,
    { newGroup, id }: { newGroup: IGroupPayload; id: string }
  ) => {
    state.groups = [...state.groups, { id: id, ...newGroup }];
  },

  deleteGroup: (state: IGroupStore, id: string) => {
    state.groups.filter((group) => group.id !== id);
  },

  participateInGroup: (
    state: IGroupStore,
    { currentUserId, groupId }: { currentUserId: string; groupId: string }
  ) => {
    state.groups = state.groups.map((group) => {
      if (
        group.id === groupId &&
        !group.users.includes(currentUserId) &&
        group.createdAt.toMillis() + TWENTY_MIN_BY_MS >
          Timestamp.now().toMillis()
      ) {
        return {
          ...group,
          users: group.users.concat([currentUserId]),
        };
      }
      return group;
    });
  },

  comeOutFromGroup: (
    state: IGroupStore,
    { currentUserId, groupId }: { currentUserId: string; groupId: string }
  ) => {
    state.groups = state.groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          users: group.users.filter((uid) => uid !== currentUserId),
        };
      }
      return group;
    });
  },
};
