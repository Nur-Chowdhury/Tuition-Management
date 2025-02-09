import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATXlpvHEYZY1SBnguI_3vMbOVyplbboj8",
  authDomain: "cuet-community.firebaseapp.com",
  projectId: "cuet-community",
  storageBucket: "cuet-community.appspot.com",
  messagingSenderId: "993662351210",
  appId: "1:993662351210:web:d69b25e5a2a6d976735713"
};

export const app = initializeApp(firebaseConfig);