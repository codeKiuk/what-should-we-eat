import { IGroupStore } from "./types";

export default {
  getGroups: (state: IGroupStore) => state.groups,
};
