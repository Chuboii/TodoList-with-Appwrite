import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,onAuthStateChanged , createUserWithEmailAndPassword, signInWithPopup,signInWithEmailAndPassword , signOut  } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBKcXgjqtT8CoiokfTS4vnf69-DHbD5cuI",
  authDomain: "todo-e5f92.firebaseapp.com",
  projectId: "todo-e5f92",
  storageBucket: "todo-e5f92.appspot.com",
  messagingSenderId: "310204142174",
  appId: "1:310204142174:web:a81f906e5a46cb42cf1acf",
  measurementId: "G-QL5FTYQS1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
 params: "select_account"
})
export const auth = getAuth();

export const signInWithGoogle = () => signInWithPopup(auth, provider)

export const emailSignup = async(email, password) => {
if(!email || !password) return
try{
  return await createUserWithEmailAndPassword(auth, email, password)
}
catch(e){
  console.log(e)
}
}

export const onAuthChanged = (callback) => onAuthStateChanged(auth, callback)  
export const signin = (email, password) => signInWithEmailAndPassword(auth, email, password)

export const signout = () => signOut(auth)