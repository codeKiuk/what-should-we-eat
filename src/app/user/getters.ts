import { IUserStore } from "./types";

export default {
  getCurrentUser: (state: IUserStore) => state.currentUser,
  getUsers: (state: IUserStore) => state.users,
};
