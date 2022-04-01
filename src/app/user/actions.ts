import { getUsers } from "@/firebase/auth";
import { ActionContext } from "vuex";
import { IUser, IUserStore } from "./types";

export default {
  getUsersAsync: async (state: ActionContext<IUserStore, any>) => {
    try {
      const users = await getUsers();
      state.commit("setUsers", users);
      return users;
    } catch (e) {
      console.log(e);
      return;
    }
  },
};
