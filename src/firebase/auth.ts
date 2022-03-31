import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { db, firebaseAuth } from "@/main";
import { IUser } from "@/app/user/types";

const googleAuth = new GoogleAuthProvider();

export const googleLogin = async () => {
  try {
    const res: UserCredential = await signInWithPopup(firebaseAuth, googleAuth);

    const credential = await GoogleAuthProvider.credentialFromResult(res);

    if (credential === null) throw new Error();

    const currentUser = {
      name: res.user.displayName || "",
      email: res.user.email || "",
      uid: res.user.uid || "",
    };

    await addUser(currentUser);

    const token = credential.accessToken;
    return { currentUser, token };
  } catch (error: any) {
    console.log("Login Error: ", error);
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    return { error, credential };
  }
};

const addUser = async (currentUser: IUser) => {
  if (currentUser.uid === firebaseAuth.currentUser?.uid) {
    return;
  }
  const docRef = await addDoc(collection(db, "User"), currentUser);
};

export default googleLogin;
