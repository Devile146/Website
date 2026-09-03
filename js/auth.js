// =========================
// FAHAD TECH - AUTHENTICATION (FIXED)
// =========================

// Track if auth state is being processed
let authStateProcessing = false;
let authStateRetryCount = 0;
const MAX_AUTH_RETRIES = 3;

// Auth state listener with proper handling
auth.onAuthStateChanged(function(user) {
    if (authStateProcessing) {
        return;
    }
    authStateProcessing = true;
    
    try {
        if (user) {
            currentUser = user;
            // Ensure user document exists before loading data
            ensureUserDocumentExists(user);
        } else {
            currentUser = null;
            currentUserData = null;
            showGuestState();
        }
    } catch (error) {
        console.error('Auth state error:', error);
        showToast('Authentication error. Please refresh the page.', 'error');
    } finally {
        authStateProcessing = false;
    }
});

// Ensure user document exists in Firestore
function ensureUserDocumentExists(user) {
    const userRef = db.collection('users').doc(user.uid);
    
    userRef.get().then((doc) => {
        if (doc.exists) {
            // Document exists, load data
            currentUserData = doc.data();
            updateUserUI(user, currentUserData);
            
            // If on account page, update account display
            if (document.getElementById('accountLoading')) {
                displayAccountData(currentUserData);
            }
        } else {
            // Document doesn't exist - create it
            createUserDocumentAndLoad(user);
        }
    }).catch((error) => {
        console.error('Error checking user document:', error);
        // Try to create document anyway
        createUserDocumentAndLoad(user);
    });
}

// Create user document and load data
function createUserDocumentAndLoad(user) {
    const userData = {
        uid: user.uid,
        displayName: user.displayName || 'User',
        email: user.email,
        credits: 25, // Give 25 free credits to new users
        accountStatus: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('users').doc(user.uid).set(userData).then(() => {
        currentUserData = userData;
        updateUserUI(user, userData);
        
        // If on account page, display data
        if (document.getElementById('accountLoading')) {
            displayAccountData(userData);
        }
        
        showToast('Account created! You have 25 free credits.', 'success');
    }).catch((error) => {
        console.error('Error creating user document:', error);
        // Use fallback data
        currentUserData = userData;
        updateUserUI(user, userData);
        showToast('Unable to save profile data. Please refresh.', 'warning');
    });
}

// Load user data (legacy function for compatibility)
function loadUserData(user) {
    ensureUserDocumentExists(user);
}

// Create user document (legacy function for compatibility)
function createUserDocument(user) {
    createUserDocumentAndLoad(user);
}

// Update user interface
function updateUserUI(user, userData) {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const navUserName = document.getElementById('navUserName');
    const navCredits = document.getElementById('navCredits');
    const mobileAuthArea = document.getElementById('mobileAuthArea');
    
    if (guestButtons) guestButtons.style.display = 'none';
    if (userLoggedIn) userLoggedIn.style.display = 'flex';
    
    if (navUserName) {
        navUserName.textContent = userData.displayName || user.displayName || 'Account';
    }
    
    if (navCredits) {
        navCredits.textContent = userData.credits || 0;
    }
    
    if (mobileAuthArea) {
        mobileAuthArea.innerHTML = `
            <div class="mobile-user-info">
                <span class="mobile-user-name">${userData.displayName || 'User'}</span>
                <span class="mobile-user-credits"><i class="fas fa-coins"></i> ${userData.credits || 0} Credits</span>
            </div>
            <button class="mobile-logout-btn" onclick="logoutUser()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        `;
    }
}

// Display account data on account page
function displayAccountData(data) {
    const loadingEl = document.getElementById('accountLoading');
    const contentEl = document.getElementById('accountContent');
    const loginRequiredEl = document.getElementById('loginRequired');
    
    if (!loadingEl || !contentEl || !loginRequiredEl) return;
    
    loadingEl.style.display = 'none';
    contentEl.style.display = 'block';
    loginRequiredEl.style.display = 'none';
    
    // Update profile info
    const nameEl = document.getElementById('accountName');
    const emailEl = document.getElementById('accountEmail');
    const creditsEl = document.getElementById('accountCredits');
    
    if (nameEl) nameEl.textContent = data.displayName || 'User';
    if (emailEl) emailEl.textContent = data.email || 'No email';
    if (creditsEl) creditsEl.textContent = data.credits || 0;
    
    // Account status
    const statusEl = document.getElementById('accountStatus');
    if (statusEl) {
        if (data.accountStatus === 'disabled') {
            statusEl.innerHTML = '<span class="status-dot disabled"></span><span>Disabled</span>';
        } else {
            statusEl.innerHTML = '<span class="status-dot active"></span><span>Active</span>';
        }
    }
    
    // Member since
    const memberSinceEl = document.getElementById('memberSince');
    if (memberSinceEl) {
        if (data.createdAt && data.createdAt.toDate) {
            const date = data.createdAt.toDate();
            memberSinceEl.textContent = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else {
            memberSinceEl.textContent = 'Today';
        }
    }
}

// Show guest state
function showGuestState() {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const mobileAuthArea = document.getElementById('mobileAuthArea');
    
    if (guestButtons) guestButtons.style.display = 'flex';
    if (userLoggedIn) userLoggedIn.style.display = 'none';
    
    if (mobileAuthArea) {
        mobileAuthArea.innerHTML = `
            <button class="mobile-auth-btn" onclick="openAuthModal('login')">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
            <button class="mobile-auth-btn" onclick="openAuthModal('register')">
                <i class="fas fa-user-plus"></i> Create Account
            </button>
        `;
    }
    
    currentUserData = null;
}

// Open auth modal
function openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('authModalTitle');
    const modalSubtitle = document.getElementById('authModalSubtitle');
    
    if (!modal) return;
    
    modal.style.display = 'flex';
    
    if (mode === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        modalTitle.textContent = 'Login';
        modalSubtitle.textContent = 'Access your account';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        modalTitle.textContent = 'Create Account';
        modalSubtitle.textContent = 'Join Fahad Tech Premium';
    }
}

// Close auth modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Switch auth mode
function switchAuthMode(mode) {
    openAuthModal(mode);
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        showToast('Login successful!', 'success');
        closeAuthModal();
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    }).catch((error) => {
        let errorMessage = error.message;
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No account found with this email. Please register first.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Too many failed attempts. Please try again later.';
        }
        showToast(errorMessage, 'error');
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    });
}

// Handle register
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const registerBtn = document.getElementById('registerBtn');
    
    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    registerBtn.disabled = true;
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
        
        return user.updateProfile({
            displayName: name
        }).then(() => {
            const userData = {
                uid: user.uid,
                displayName: name,
                email: email,
                credits: 25, // 25 free credits for new users
                accountStatus: 'active',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            return db.collection('users').doc(user.uid).set(userData);
        });
    }).then(() => {
        showToast('Account created successfully! You have 25 free credits.', 'success');
        closeAuthModal();
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    }).catch((error) => {
        let errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email is already registered. Please login instead.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email address. Please check and try again.';
        }
        showToast(errorMessage, 'error');
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    });
}

// Logout user
function logoutUser() {
    auth.signOut().then(() => {
        showToast('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }).catch((error) => {
        showToast('Error logging out: ' + error.message, 'error');
    });
}

// Go to account
function goToAccount() {
    window.location.href = 'account.html';
}

// Toast notification
function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    
    const icons = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'info': 'fas fa-info-circle',
        'warning': 'fas fa-exclamation-triangle'
    };
    
    toast.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
                   }
