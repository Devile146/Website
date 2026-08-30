// ============================================
// FAHAD TECH - FIREBASE CONFIGURATION
// YAHAN APNI FIREBASE CONFIG PASTE KARO
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyDHJflwa4XJ9koDqfsQ2tOCDm93TTUhKqA",
  authDomain: "fahad-tech-website.firebaseapp.com",
  projectId: "fahad-tech-website",
  storageBucket: "fahad-tech-website.firebasestorage.app",
  messagingSenderId: "487340113323",
  appId: "1:487340113323:web:6c0923e8c95b4064e5a6ee"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Collections
const usersCollection = db.collection('users');
const toolsCollection = db.collection('tools');
const packagesCollection = db.collection('creditPackages');
const purchasesCollection = db.collection('purchaseRequests');
const transactionsCollection = db.collection('transactions');
const notificationsCollection = db.collection('notifications');
const settingsCollection = db.collection('settings');
