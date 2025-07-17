import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9VsymjP5cu6d0lFz1U58TA66RetORwBs",
  authDomain: "cateringsystem-d78e2.firebaseapp.com",
  projectId: "cateringsystem-d78e2",
  storageBucket: "cateringsystem-d78e2.appspot.com",
  messagingSenderId: "543678075968",
  appId: "1:543678075968:web:0108d4ae0090eacf4a3ba5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
