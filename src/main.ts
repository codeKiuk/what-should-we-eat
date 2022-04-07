import { createApp } from "vue";
import App from "./App.vue";
import store from "./app/store";
import router from "@/router";
import { FirebaseApp, initializeApp } from "@firebase/app";
import { Auth, getAuth } from "@firebase/auth";
import { Firestore, getFirestore } from "@firebase/firestore";
import firebaseConfig from "../firebaseConfig";

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
export const firebaseAuth: Auth = getAuth();

createApp(App).use(router).use(store).mount("#app");
