import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkwvuHGFWvSVp5MYYseWnnDFoDp1gZOHw",
  authDomain: "lgk7186-5c97d.firebaseapp.com",
  projectId: "lgk7186-5c97d",
  storageBucket: "lgk7186-5c97d.appspot.com",
  messagingSenderId: "21729978003",
  appId: "1:21729978003:web:458d5acf44cd57dd3c4f66",
  measurementId: "G-MSGJ8NX6RW"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
