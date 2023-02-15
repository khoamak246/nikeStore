// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvBrrwftw_U7-OsK8gFJm98jMfPCAmWwU",
  authDomain: "nikestore-61243.firebaseapp.com",
  projectId: "nikestore-61243",
  storageBucket: "nikestore-61243.appspot.com",
  messagingSenderId: "28094479785",
  appId: "1:28094479785:web:2696fe51e1130327c198b8",
  measurementId: "G-2BXF4NGYE5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getFirestore(getAuth);
const storage = getStorage(app);

export { db, auth, storage };
export default app;
