import { createStore } from "vuex";
import UserStore from "./user/store";

const store = createStore({
  modules: { UserStore },
});

export default store;
