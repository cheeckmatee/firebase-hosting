// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyDMrHVS7CwkEZ_-BToOoac-l2RI54ph4p4",
  authDomain: "tavodelivery-3e10f.firebaseapp.com",
  projectId: "tavodelivery-3e10f",
  storageBucket: "tavodelivery-3e10f.firebasestorage.app",
  messagingSenderId: "1050219630905",
  appId: "1:1050219630905:web:9d0488589b6dd5423e98e8",
  measurementId: "G-3SQ7JSE89M"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };