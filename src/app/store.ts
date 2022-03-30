import { createStore } from "vuex";
import TodoStore from "./todo/store";

const store = createStore({
  modules: { TodoStore },
});

export default store;
