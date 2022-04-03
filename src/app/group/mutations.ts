import { Timestamp } from "firebase/firestore";
import { IGroup, IGroupPayload, IGroupStore } from "./types";

export default {
  setGroups: (state: IGroupStore, groups: IGroup[]) => {
    state.groups = groups;
  },

  createGroup: (
    state: IGroupStore,
    { newGroup, id }: { newGroup: IGroupPayload; id: string }
  ) => {
    state.groups.push({ id, ...newGroup });
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
        group.createdAt.toMillis() + 60000 * 20 > Timestamp.now().toMillis()
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
