import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { IUserStore } from "./types";

const UserStore = {
  namespaced: true,
  state: () =>
    ({
      isLoggedIn: false,
      currentUser: { name: "", email: "", uid: "" },
      users: [],
    } as IUserStore),
  getters: getters,
  mutations: mutations,
  actions: actions,
};

export default UserStore;
