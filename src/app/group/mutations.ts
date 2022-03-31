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
};
