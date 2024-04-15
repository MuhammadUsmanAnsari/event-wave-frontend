// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2QaE5K-LCb04R-pAMCfkvFu-oAumFrGc",
    authDomain: "eventwawe.firebaseapp.com",
    projectId: "eventwawe",
    storageBucket: "eventwawe.appspot.com",
    messagingSenderId: "23146952004",
    appId: "1:23146952004:web:cbc88a84dd7aa8070d1311",
    measurementId: "G-GV5ZNKNSPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getAnalytics(app);
const storage = getStorage(app);


export { firestore, analytics, storage }

