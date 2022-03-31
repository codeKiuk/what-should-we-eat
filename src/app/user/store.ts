import * as mutations from "./mutations";

const UserStore = {
  state: () => ({ count: 0 }),
  mutations: mutations,
};

export default UserStore;
