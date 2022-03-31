import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { db, firebaseAuth } from "@/main";

const googleAuth = new GoogleAuthProvider();

export const googleLogin = async () => {
  try {
    const res: UserCredential = await signInWithPopup(firebaseAuth, googleAuth);

    const credential = await GoogleAuthProvider.credentialFromResult(res);

    console.log("credential: ", credential);
    console.log("res: ", res);

    if (credential === null) throw new Error();

    await addUser(res.user);

    const token = credential.accessToken;
    return { user: res.user, token };
  } catch (error: any) {
    console.log("Login Error: ", error);
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  }
};

const addUser = async (user: User) => {
  const docRef = await addDoc(collection(db, "User"), {
    name: user.displayName,
    email: user.email,
    uid: user.uid,
  });
};

export default googleLogin;
