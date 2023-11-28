import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7reR5h1VbgMOW7F9e7tNbLgRJK_l7o3c",
  authDomain: "rotafacil-service.firebaseapp.com",
  projectId: "rotafacil-service",
};


const connection = initializeApp(firebaseConfig);

export const DataBase = getFirestore(connection);