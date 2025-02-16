// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

// Autenticación
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firestore
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxOVGBYquXye8dyDoPvL2WosF7PsmwCp4",
  authDomain: "pagina-ebiz.firebaseapp.com",
  projectId: "pagina-ebiz",
  storageBucket: "pagina-ebiz.firebasestorage.app",
  messagingSenderId: "927403094325",
  appId: "1:927403094325:web:9e6fa51ff3f84670a61c7c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore();

// Operaciones CRUD

export const createFacturas = (facturas, monto, numero, idFacturas) =>
  addDoc(collection(db, "facturas"), { facturas, monto, numero, idFacturas });

export const onGetFacturas = (callback) =>
  onSnapshot(collection(db, "facturas"), callback);
