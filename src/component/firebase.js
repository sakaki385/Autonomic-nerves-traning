import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//getFirestoreでFirebaseと接続する

const firebaseConfig = {
  apiKey: "AIzaSyB6MbumcMNnVboKSC5ax585cELiOn19dEs",
  authDomain: "autonomic-nerves.firebaseapp.com",
  projectId: "autonomic-nerves",
  storageBucket: "autonomic-nerves.appspot.com",
  messagingSenderId: "371721700801",
  appId: "1:371721700801:web:732ca498da4a2487eddb40",
  measurementId: "G-KG4X7NJKKN",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, analytics, provider, db };
