import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBrhNzI7JwsNlIAPch6S0aMyjcYB5SJcfc",

  authDomain: "pxlguessr.firebaseapp.com",

  projectId: "pxlguessr",

  storageBucket: "pxlguessr.appspot.com",

  messagingSenderId: "725728884610",

  appId: "1:725728884610:web:a976aa299bbd7d9f40419b",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
