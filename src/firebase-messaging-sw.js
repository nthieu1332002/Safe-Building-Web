import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getMessaging, getToken} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_API,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();

const messaging = getMessaging(app);

// getToken(messaging, {vapidKey: 'BJ9jnZWa5KvjLVZk-81MHsKU1NxxB8e1yAcBQsr1Dru3bjYAZ0rKbBZrGvSEfq5BBcDsYpJi3sdb3PtLL48WwH8'})
// .then((currentToken) => {
//   if (currentToken) {
//     console.log(currentToken);
//   }
//   else {
//     console.log("not have");
//   }
// })
