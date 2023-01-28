import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyAf7NjGVT11pxvkl4QRyuaTSaRFnR4i3oc",

  authDomain: "easybudget-fac4a.firebaseapp.com",

  projectId: "easybudget-fac4a",

  storageBucket: "easybudget-fac4a.appspot.com",

  messagingSenderId: "596944194003",

  appId: "1:596944194003:web:666994853a483b37558726"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
