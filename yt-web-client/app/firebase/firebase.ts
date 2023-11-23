// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
    User
} from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI-zLqrOIEEBkF_o2YsJndCar1nAVMLw8",
  authDomain: "yt-clone-88c29.firebaseapp.com",
  projectId: "yt-clone-88c29",
  storageBucket: "yt-clone-88c29.appspot.com",
  messagingSenderId: "983255221454",
  appId: "1:983255221454:web:22c357873baa01c5ea3c9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export const functions = getFunctions();

/**
 * Signs the user in with a Google sign in
 * @returns A promise that resolves with user creds
 */

export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs user out
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
    return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes 
 * @return a function to unsubscrive callback
 */

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);

}