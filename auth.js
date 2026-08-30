// ============================================
// FAHAD TECH - AUTHENTICATION SYSTEM
// ============================================

const DEFAULT_CREDITS = 50;

// ============ AUTH STATE LISTENER ============
auth.onAuthStateChanged(function(user) {
    if (user) {
        // User logged in
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email);
        updateUIForLoggedInUser(user);
        loadUserCredits(user.uid);
        loadUserNotifications(user.uid);
    } else {
        // User logged out
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        updateUIForLoggedOutUser();
    }
});

// ============ REGISTER ============
async function registerUser(email, password) {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;
        
        // Create user profile in Firestore
        await usersCollection.doc(user.uid).set({
            email: email,
            credits: DEFAULT_CREDITS,
            accountStatus: 'active',
            role: 'user',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Welcome notification
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
        
        // Update last login
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

// ============ LOAD USER CREDITS ============
async function loadUserCredits(userId) {
    try {
        const doc = await usersCollection.doc(userId).get();
        if (doc.exists) {
            const credits = doc.data().credits || 0;
            document.querySelectorAll('.credit-display').forEach(el => {
                el.textContent = credits + ' Credits';
            });
            document.querySelectorAll('.credit-number').forEach(el => {
                el.textContent = credits;
            });
        }
    } catch (error) {
        console.error('Error loading credits:', error);
    }
}

// ============ LOAD USER NOTIFICATIONS ============
async function loadUserNotifications(userId) {
    try {
        const snapshot = await notificationsCollection
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get();
        
        const notifications = [];
        snapshot.forEach(doc => {
            notifications.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        displayNotifications(notifications);
        return notifications;
    } catch (error) {
        console.error('Error loading notifications:', error);
        return [];
    }
}

// ============ DISPLAY NOTIFICATIONS ============
function displayNotifications(notifications) {
    const container = document.getElementById('notificationsContainer');
    if (!container) return;
    
    if (notifications.length === 0) {
        container.innerHTML = '<p style="color:#fff;text-align:center;">No notifications yet</p>';
        return;
    }
    
    container.innerHTML = notifications.map(notif => `
        <div class="notification-item ${notif.read ? 'read' : 'unread'}" style="
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.10);
            border-radius: 10px;
            padding: 12px;
            margin-bottom: 8px;
        ">
            <strong style="color:${notif.read ? '#a0a0b8' : '#FFD700'};">${notif.title}</strong>
            <p style="color:#c0c0d0;font-size:12px;margin-top:4px;">${notif.message}</p>
            <span style="font-size:10px;color:#a0a0b8;">
                ${notif.createdAt ? new Date(notif.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
            </span>
        </div>
    `).join('');
}

// ============ UI UPDATES ============
function updateUIForLoggedInUser(user) {
    document.querySelectorAll('.auth-required').forEach(el => {
        el.style.display = 'block';
    });
    document.querySelectorAll('.auth-hidden').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show user email
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

// ============ PROTECTED PAGE CHECK ============
async function checkProtectedAccess() {
    const user = auth.currentUser;
    
    if (!user) {
        // Not logged in - redirect to auth
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'auth.html';
        return false;
    }
    
    // Check if active
    const userData = await getCurrentUserData();
    if (!userData || userData.accountStatus !== 'active') {
        alert('Your account is currently inactive. Please contact admin.');
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// ============ SHOW AUTH MODAL ============
function showAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}