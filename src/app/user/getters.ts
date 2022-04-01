import { IUserStore } from "./types";

export default {
  getIsLoggedIn: (state: IUserStore) => state.isLoggedIn,
  getCurrentUser: (state: IUserStore) => state.currentUser,
  getUsers: (state: IUserStore) => state.users,
};
