// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWsboCITbe4LuOQ_7er3Nhkuv81YWbY3w",
  authDomain: "path-follower-3b272.firebaseapp.com",
  projectId: "path-follower-3b272",
  storageBucket: "path-follower-3b272.appspot.com",
  messagingSenderId: "757145827495",
  appId: "1:757145827495:web:ee3379d9d7e6c713610382",
  measurementId: "G-X9TZPBRZTS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
