// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyNk5BJscelHhxjKRHKlOZpYnNKgnh3B4",
    authDomain: "controle-gc.firebaseapp.com",
    projectId: "controle-gc",
    storageBucket: "controle-gc.firebasestorage.app",
    messagingSenderId: "197002816768",
    appId: "1:197002816768:web:a6a56f47421ea52961d7e5",
    measurementId: "G-EJN7NMWZ6P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
