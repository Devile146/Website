// ============================================
// FAHAD TECH - AUTHENTICATION SYSTEM
// ============================================

const DEFAULT_CREDITS = 50;

// ============ AUTH STATE LISTENER ============
auth.onAuthStateChanged(function(user) {
    if (user) {
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email);
        updateUIForLoggedInUser(user);
        loadUserCredits(user.uid);
        loadUserNotifications(user.uid);
    } else {
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        updateUIForLoggedOutUser();
    }
});

// ============ REGISTER ============
async function registerUser(email, password, name = '') {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;
        
        await usersCollection.doc(user.uid).set({
            name: name || email.split('@')[0],
            email: email,
            credits: DEFAULT_CREDITS,
            accountStatus: 'active',
            role: 'user',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await notificationsCollection.add({
            userId: user.uid,
            title: '🎉 Welcome to Fahad Tech!',
            message: 'Your account has been created with ' + DEFAULT_CREDITS + ' free credits.',
            type: 'welcome',
            read: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true, user: user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============ LOGIN ============
async function loginUser(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        
        await usersCollection.doc(result.user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true, user: result.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============ LOGOUT ============
async function logoutUser() {
    try {
        await auth.signOut();
        window.location.href = 'index.html';
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============ RESET PASSWORD ============
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        return { success: true, message: 'Password reset email sent! Check your inbox.' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============ GET CURRENT USER DATA ============
async function getCurrentUserData() {
    const user = auth.currentUser;
    if (!user) return null;
    
    try {
        const doc = await usersCollection.doc(user.uid).get();
        if (doc.exists) {
            return doc.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}

// ============ CHECK IF USER ACTIVE ============
async function isUserActive() {
    const userData = await getCurrentUserData();
    return userData && userData.accountStatus === 'active';
}

// ============ UPDATE UI ============
function updateUIForLoggedInUser(user) {
    document.querySelectorAll('.auth-required').forEach(el => {
        el.style.display = 'block';
    });
    document.querySelectorAll('.auth-hidden').forEach(el => {
        el.style.display = 'none';
    });
    
    document.querySelectorAll('.user-email-display').forEach(el => {
        el.textContent = user.email;
    });
}

function updateUIForLoggedOutUser() {
    document.querySelectorAll('.auth-required').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.auth-hidden').forEach(el => {
        el.style.display = 'block';
    });
}
