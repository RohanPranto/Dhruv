import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8mV7d4yCt7xYEiXhD3rJbLaNIGGpc5vc",
  authDomain: "dhruv-86630.firebaseapp.com",
  projectId: "dhruv-86630",
  storageBucket: "dhruv-86630.appspot.com",
  messagingSenderId: "107413949508",
  appId: "1:107413949508:web:89931f9e735b1c2b534011"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };