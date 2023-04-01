import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBe5zwprtxHRTYFoig2QuDD5YXRwcEJT6k",
  authDomain: "expense-tracker-authenti-436ee.firebaseapp.com",
  projectId: "expense-tracker-authenti-436ee",
  storageBucket: "expense-tracker-authenti-436ee.appspot.com",
  messagingSenderId: "771576064657",
  appId: "1:771576064657:web:ad9124551ab91a6cbb2d30",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
