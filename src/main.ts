import { createApp } from "vue";
import App from "./App.vue";
import store from "./app/store";
import router from "@/router";
import { initializeApp, FirebaseApp } from "@firebase/app";
import { getAuth, Auth } from "@firebase/auth";
import { getFirestore, Firestore } from "@firebase/firestore";
import firebaseConfig from "../firebaseConfig";

console.log(process.env);
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
export const firebaseAuth: Auth = getAuth(app);

createApp(App).use(router).use(store).mount("#app");
