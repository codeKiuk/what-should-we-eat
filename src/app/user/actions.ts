import { getUsers } from "@/firebase/auth";
import { ActionContext } from "vuex";
import { IUser, IUserStore } from "./types";
import { firebaseAuth } from "@/main";

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

  setCurrentUserAsync: async (state: ActionContext<IUserStore, any>) => {
    if (!firebaseAuth.currentUser) return;
    state.commit("setCurrentUser", {
      name: firebaseAuth.currentUser.displayName,
      uid: firebaseAuth.currentUser.uid,
      email: firebaseAuth.currentUser.email,
    } as IUser);
  },
};
