import { IGroupStore } from "./types";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import { Module } from "vuex";
import { IRootStore } from "../store";

const GroupStore: Module<IGroupStore, IRootStore> = {
  state: () =>
    ({
      groups: [],
    } as IGroupStore),
  mutations,
  actions,
  getters,
};

export default GroupStore;
