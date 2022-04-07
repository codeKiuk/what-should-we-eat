import { IUser, IUserStore } from "./types";

export default {
  setCurrentUser: (state: IUserStore, currentUser: IUser) => {
    state.currentUser = currentUser;
  },

  setUsers: (state: IUserStore, users: IUser[]) => {
    state.users = users;
  },
};
