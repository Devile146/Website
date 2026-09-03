// ==========================================
// FAHAD TECH - FIREBASE INITIALIZATION
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyDHJflwa4XJ9koDqfsQ2tOCDm93TTUhKqA",
    authDomain: "fahad-tech-website.firebaseapp.com",
    projectId: "fahad-tech-website",
    storageBucket: "fahad-tech-website.firebasestorage.app",
    messagingSenderId: "487340113323",
    appId: "1:487340113323:web:6c0923e8c95b4064e5a6ee"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
