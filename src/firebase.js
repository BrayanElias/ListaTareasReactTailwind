import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUFi6vwGrCib9L0I51X8iH4Pg78OVMSWg",
    authDomain: "todoapp-2ea25.firebaseapp.com",
    projectId: "todoapp-2ea25",
    storageBucket: "todoapp-2ea25.appspot.com",
    messagingSenderId: "113859390434",
    appId: "1:113859390434:web:d61a01b0aa6440ba8b27bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);