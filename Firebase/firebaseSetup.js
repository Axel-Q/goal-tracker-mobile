// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
// import {
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
// } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: apiKey,
    // authDomain: authDomain,
    // projectId: projectId,
    // storageBucket: storageBucket,
    // messagingSenderId: messagingSenderId,
    // appId: appId,
    apiKey: "AIzaSyA2I19uPHVHBkL_MBHgzHymKtsyZ6uvKfM",
    authDomain: "mobile-axel.firebaseapp.com",
    projectId: "mobile-axel",
    storageBucket: "mobile-axel.appspot.com",
    messagingSenderId: "34976857120",
    appId: "1:34976857120:web:d981a0a64f913a43c15045"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);