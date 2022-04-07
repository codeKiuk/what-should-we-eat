import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "@firebase/auth";
import { collection, getDocs, query, setDoc, doc } from "@firebase/firestore";
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
  } catch (e: any) {
    console.log("Login Error: ", e);
    const errorCode = e.code;
    const errorMessage = e.message;
    const email = e.email;
    const credential = GoogleAuthProvider.credentialFromError(e);
    return { e, credential };
  }
};

const addUser = async (currentUser: IUser) => {
  // const docRef = await addDoc(collection(db, "User"), currentUser);
  const docRef = await doc(db, "User", currentUser.uid);
  await setDoc(docRef, currentUser);
};

export const getUsers = async () => {
  try {
    const q = query(collection(db, "User"));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (e) {
    throw new Error("Failed to get Users");
  }
};

export default googleLogin;
