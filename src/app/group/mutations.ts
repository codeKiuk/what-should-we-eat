import { IGroup, IGroupStore } from "./types";

export default {
  setGroups: (state: IGroupStore, groups: IGroup[]) => {
    state.groups = groups;
  },
};
