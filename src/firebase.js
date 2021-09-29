// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcGjaQpRGmfCeg9JF_pgugSJaCYI7TON8",
  authDomain: "color-palette-1cfbd.firebaseapp.com",
  projectId: "color-palette-1cfbd",
  storageBucket: "color-palette-1cfbd.appspot.com",
  messagingSenderId: "567599328656",
  appId: "1:567599328656:web:50c6a637a0db520661d715"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();