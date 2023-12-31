import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWzrK2Pzwv9j4ijcrG5BEIz3Zte3p_Y6E",
  authDomain: "water-bill-system-c7eec.firebaseapp.com",
  projectId: "water-bill-system-c7eec",
  storageBucket: "water-bill-system-c7eec.appspot.com",
  messagingSenderId: "621425605786",
  appId: "1:621425605786:web:1f33b542a1325c9a083323"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

