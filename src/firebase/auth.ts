import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import firebase from ".";

const firebaseAuth = getAuth(firebase);

const googleAuth = new GoogleAuthProvider();
export const googleLogin = () => {
  return signInWithPopup(firebaseAuth, googleAuth);
};

export default googleLogin;
