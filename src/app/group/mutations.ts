import { Timestamp } from "firebase/firestore";
import { IGroup, IGroupPayload, IGroupStore } from "./types";
import { TWENTY_MIN_BY_MS } from "@/assets/constants/constants";

export default {
  setGroups: (store: IGroupStore, groups: IGroup[]) => {
    store.groups = groups;
  },

  createGroup: (
    store: IGroupStore,
    { newGroup, id }: { newGroup: IGroupPayload; id: string }
  ) => {
    store.groups = [...store.groups, { id: id, ...newGroup }];
  },

  deleteGroup: (store: IGroupStore, id: string) => {
    store.groups.filter((group) => group.id !== id);
  },

  participateInGroup: (
    store: IGroupStore,
    { currentUserId, groupId }: { currentUserId: string; groupId: string }
  ) => {
    store.groups = store.groups.map((group) => {
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
    store: IGroupStore,
    { currentUserId, groupId }: { currentUserId: string; groupId: string }
  ) => {
    store.groups = store.groups.map((group) => {
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
