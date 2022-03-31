import { IUser, IUserStore } from "./types";

export default {
  setLoggedIn: (state: IUserStore, isLoggedIn: boolean) => {
    state.isLoggedIn = isLoggedIn;
  },

  setCurrentUser: (state: IUserStore, currentUser: IUser) => {
    state.currentUser = currentUser;
  },
};
