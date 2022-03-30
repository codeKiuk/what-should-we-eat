// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdFlyPOG_QObFlJO8ufQR1J_GrYH0qEVk",
  authDomain: "what-should-we-eat-ecde4.firebaseapp.com",
  projectId: "what-should-we-eat-ecde4",
  storageBucket: "what-should-we-eat-ecde4.appspot.com",
  messagingSenderId: "743872358181",
  appId: "1:743872358181:web:a7761e5d37af2bfbe85ccc",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
