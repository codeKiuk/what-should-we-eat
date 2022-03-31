import { createApp } from "vue";
import App from "./App.vue";
import store from "./app/store";
import router from "./router";
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);

createApp(App).use(router).use(store).mount("#app");
