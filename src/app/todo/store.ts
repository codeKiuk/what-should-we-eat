import * as mutations from "./mutations";

const TodoStore = {
  state: () => ({ count: 0 }),
  mutations: mutations,
};

export default TodoStore;
