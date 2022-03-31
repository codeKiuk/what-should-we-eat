import { IUserStore } from "./types";

export default {
  getIsLoggedIn: (state: IUserStore) => state.isLoggedIn,
};
