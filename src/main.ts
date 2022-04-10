import { createApp } from "vue";
import App from "./App.vue";
import store from "./app/store";
import router from "@/router";
import { FirebaseApp, initializeApp } from "@firebase/app";
import { Auth, getAuth } from "@firebase/auth";
import { Firestore, getFirestore } from "@firebase/firestore";
import firebaseConfig from "../firebaseConfig";
import { getStorage } from "firebase/storage";

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
export const firebaseAuth: Auth = getAuth();
export const storage = getStorage(app);

createApp(App).use(router).use(store).mount("#app");
