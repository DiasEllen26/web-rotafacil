import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC7reR5h1VbgMOW7F9e7tNbLgRJK_l7o3c",
  authDomain: "rotafacil-service.firebaseapp.com",
  projectId: "rotafacil-service",
  storageBucket: "rotafacil-service.appspot.com",
  messagingSenderId: "538763090457",
  appId: "1:538763090457:web:c5b9cb2cc463829e072888"
};

export const connection = initializeApp(firebaseConfig);