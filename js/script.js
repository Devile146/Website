// =========================================================
// FAHAD TECH - MAIN SCRIPT (25 FREE SIGNUP CREDITS ONCE)
// =========================================================

const CONFIG = {
    WHATSAPP_LINK: "https://wa.me/923251138960",
    TELEGRAM_LINK: "https://t.me/fahad_tricks_bot",
    EMAIL_LINK: "mailto:fahadali2727@gmail.com",
    PREMIUM_WHATSAPP: "https://wa.me/923251138959",
    PROFILE_IMAGE: "https://raw.githubusercontent.com/Devile146/Website/main/Dppic.jpg"
};

var currentUser = null;
var currentUserData = null;
var isProcessingTool = false;
var activeToolsList = [];
var selectedToolIdForAccess = null;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initContactLinks();
    initProfileImage();
    
    if (document.getElementById('toolsGrid')) {
        loadToolsFromBackend();
    }
});

// =========================
// LOAD TOOLS FROM BACKEND
// =========================
function loadToolsFromBackend() {
    const toolsGrid = document.getElementById('toolsGrid');
    const toolsLoading = document.getElementById('toolsLoading');
    
    if (toolsLoading) toolsLoading.style.display = 'block';

    db.collection('tools').where('status', '==', 'active').get().then((snapshot) => {
        if (toolsLoading) toolsLoading.style.display = 'none';
        
        activeToolsList = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            activeToolsList.push({
                id: doc.id,
                name: data.name || 'Tool',
                description: data.description || '',
                category: data.category || 'utility',
                icon: data.icon || 'fas fa-tools',
                type: data.type || 'free',
                creditCost: data.creditCost !== undefined ? data.creditCost : 5
            });
        });

        if (activeToolsList.length === 0 && typeof toolsData !== 'undefined') {
            activeToolsList = toolsData.map((t, idx) => ({ id: 'local_' + idx, ...t }));
        }

        renderTools('all');
        checkUrlCategory();
    }).catch((err) => {
        console.error("Error loading tools from backend:", err);
        if (toolsLoading) toolsLoading.style.display = 'none';
        if (typeof toolsData !== 'undefined') {
            activeToolsList = toolsData.map((t, idx) => ({ id: 'local_' + idx, ...t }));
            renderTools('all');
        }
    });
}

// =========================
// AUTHENTICATION & USER DATA
// =========================
function initAuthState() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            currentUser = user;
            loadUserData(user);
        } else {
            currentUser = null;
            currentUserData = null;
            showGuestState();
        }
    });
}

// REFRESH PAR SIRF DATABASE SE ASAL CREDITS LOAD HONGE (OVERWRITE NAHI HOGA)
function loadUserData(user) {
    if (!user) return;
    
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            currentUserData = doc.data();
            currentUserData.credits = typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
            updateUserUI(user, currentUserData);
        } else {
            // Agar account bilkul naya ho jo register se nahi bana
            const userData = {
                uid: user.uid,
                displayName: user.displayName || 'User',
                email: user.email || '',
                credits: 25, // 1 Time 25 Free Credits
                accountStatus: 'active',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            db.collection('users').doc(user.uid).set(userData).then(() => {
                currentUserData = userData;
                updateUserUI(user, userData);
            });
        }
    }).catch((error) => {
        console.error("Error loading user data:", error);
    });
}

function updateUserUI(user, userData) {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const navUserName = document.getElementById('navUserName');
    const navCredits = document.getElementById('navCredits');
    const mobileAuthArea = document.getElementById('mobileAuthArea');
    
    const credits = userData && typeof userData.credits === 'number' ? userData.credits : 0;
    
    if (guestButtons) guestButtons.style.display = 'none';
    if (userLoggedIn) userLoggedIn.style.display = 'flex';
    
    if (navUserName) {
        navUserName.textContent = (userData && userData.displayName) || (user && user.displayName) || 'Account';
    }
    
    if (navCredits) {
        navCredits.textContent = credits;
    }
    
    const unlockCurrentCredits = document.getElementById('unlockCurrentCredits');
    if (unlockCurrentCredits) {
        unlockCurrentCredits.textContent = credits;
    }
    
    if (mobileAuthArea) {
        mobileAuthArea.innerHTML = `
            <div class="mobile-user-info">
                <span class="mobile-user-name">${(userData && userData.displayName) || 'User'}</span>
                <span class="mobile-user-credits"><i class="fas fa-coins"></i> ${credits} Credits</span>
            </div>
            <button class="mobile-logout-btn" onclick="logoutUser()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        `;
    }
}

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
}

function openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('authModalTitle');
    const modalSubtitle = document.getElementById('authModalSubtitle');
    
    if (!modal) return;
    modal.style.display = 'flex';
    
    if (mode === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        if (modalTitle) modalTitle.textContent = 'Login';
        if (modalSubtitle) modalSubtitle.textContent = 'Access your account';
    } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        if (modalTitle) modalTitle.textContent = 'Create Account';
        if (modalSubtitle) modalSubtitle.textContent = 'Get 25 Free Welcome Credits!';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.style.display = 'none';
}

function switchAuthMode(mode) {
    openAuthModal(mode);
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
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
        loadUserData(userCredential.user);
    }).catch((error) => {
        showToast(error.message, 'error');
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    });
}

// REGISTRATION: SIRF PEHLI DAFA 25 CREDITS SAVE HONGE
function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
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
        return user.updateProfile({ displayName: name }).then(() => {
            const userData = {
                uid: user.uid,
                displayName: name,
                email: email,
                credits: 25, // 🎁 25 FREE WELCOME CREDITS (1-TIME ONLY)
                accountStatus: 'active',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            return db.collection('users').doc(user.uid).set(userData);
        }).then(() => {
            currentUserData = {
                uid: user.uid,
                displayName: name,
                email: email,
                credits: 25,
                accountStatus: 'active'
            };
            updateUserUI(user, currentUserData);
        });
    }).then(() => {
        showToast('Account created! 25 Free Credits Added 🎁', 'success');
        closeAuthModal();
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    }).catch((error) => {
        showToast(error.message, 'error');
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    });
}

function logoutUser() {
    sessionStorage.clear();
    auth.signOut().then(() => {
        showToast('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    }).catch((error) => {
        showToast('Error logging out: ' + error.message, 'error');
    });
}

function goToAccount() {
    window.location.href = 'account.html';
}

// =========================
// RENDER TOOLS
// =========================
function renderTools(category = 'all', searchTerm = '') {
    const toolsGrid = document.getElementById('toolsGrid');
    const toolsEmpty = document.getElementById('toolsEmpty');
    
    if (!toolsGrid) return;
    
    let filteredTools = activeToolsList;
    
    if (category !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === category);
    }
    
    if (searchTerm) {
        filteredTools = filteredTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) ||
            (tool.description && tool.description.toLowerCase().includes(searchTerm))
        );
    }
    
    toolsGrid.innerHTML = '';
    
    if (filteredTools.length === 0) {
        toolsGrid.style.display = 'none';
        if (toolsEmpty) toolsEmpty.style.display = 'block';
        return;
    }
    
    toolsGrid.style.display = 'grid';
    if (toolsEmpty) toolsEmpty.style.display = 'none';
    
    filteredTools.forEach((tool, index) => {
        const card = document.createElement('div');
        card.classList.add('tool-card');
        card.style.animationDelay = (index * 0.03) + 's';
        
        const isPremium = tool.type === 'premium';
        
        if (isPremium) {
            card.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon || 'fas fa-crown'}"></i>
                </div>
                <span class="tool-category-badge premium-badge"><i class="fas fa-crown"></i> PREMIUM</span>
                <h3>${escapeHtml(tool.name)}</h3>
                <p>${escapeHtml(tool.description)}</p>
                <button onclick="contactAdminForPremium('${escapeHtml(tool.name)}')" class="tool-btn premium-btn">
                    Contact Admin <i class="fas fa-crown"></i>
                </button>
            `;
        } else {
            card.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon || 'fas fa-tools'}"></i>
                </div>
                <span class="tool-category-badge">${getCategoryName(tool.category)}</span>
                <h3>${escapeHtml(tool.name)}</h3>
                <p>${escapeHtml(tool.description)}</p>
                <button onclick="openVisitModal('${tool.id}', '${escapeHtml(tool.name)}', ${tool.creditCost || 5})" class="tool-btn free-btn">
                    Open Tool (${tool.creditCost || 5} Credits) <i class="fas fa-lock"></i>
                </button>
            `;
        }
        
        toolsGrid.appendChild(card);
    });
}

function contactAdminForPremium(toolName) {
    window.open(`${CONFIG.PREMIUM_WHATSAPP}?text=${encodeURIComponent('Hello! I am interested in premium tool: ' + toolName)}`, '_blank');
}

// ==========================================
// SECURE TOOL UNLOCK (BACKEND TRANSACTION)
// ==========================================
function openVisitModal(toolId, toolName, creditCost = 5) {
    selectedToolIdForAccess = toolId;
    const modal = document.getElementById('visitModal');
    const modalToolName = document.getElementById('modalToolName');
    const visitBtn = document.getElementById('visitLink') || document.getElementById('confirmToolAccessBtn');
    
    if (modal && modalToolName) {
        modalToolName.textContent = toolName;
        if (visitBtn) {
            visitBtn.innerHTML = `Unlock & Open (${creditCost} Credits) <i class="fas fa-external-link-alt"></i>`;
            visitBtn.removeAttribute('href');
            visitBtn.onclick = processToolAccess;
        }
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('visitModal');
    if (modal) modal.style.display = 'none';
    selectedToolIdForAccess = null;
}

function processToolAccess() {
    if (isProcessingTool) return;
    
    if (!currentUser) {
        closeModal();
        openAuthModal('login');
        return;
    }
    
    if (currentUserData && currentUserData.accountStatus === 'disabled') {
        closeModal();
        showToast('Your account is disabled. Please contact support.', 'error');
        return;
    }
    
    const userCredits = currentUserData ? (currentUserData.credits || 0) : 0;
    if (userCredits < 5) {
        closeModal();
        showInsufficientCredits(5);
        return;
    }
    
    isProcessingTool = true;
    const visitBtn = document.getElementById('visitLink') || document.getElementById('confirmToolAccessBtn');
    if (visitBtn) {
        visitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Unlocking Tool...';
    }

    const newTab = window.open('about:blank', '_blank');
    const userRef = db.collection('users').doc(currentUser.uid);
    
    db.runTransaction((transaction) => {
        return transaction.get(userRef).then((userDoc) => {
            if (!userDoc.exists) throw new Error('User not found');
            const data = userDoc.data();
            const currCreds = typeof data.credits === 'number' ? data.credits : 0;
            
            if (currCreds < 5) {
                throw new Error('Insufficient credits');
            }
            
            const newCreds = currCreds - 5;
            transaction.update(userRef, {
                credits: newCreds,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return newCreds;
        });
    }).then((newCredits) => {
        if (currentUserData) currentUserData.credits = newCredits;
        updateCreditsDisplay(newCredits);
        
        return db.collection('tools').doc(selectedToolIdForAccess).get();
    }).then((toolDoc) => {
        isProcessingTool = false;
        closeModal();
        
        let toolUrl = '';
        if (toolDoc && toolDoc.exists) {
            toolUrl = toolDoc.data().link;
        } else if (typeof toolsData !== 'undefined') {
            const found = toolsData.find(t => t.name === document.getElementById('modalToolName').textContent);
            if (found) toolUrl = found.link;
        }
        
        if (toolUrl) {
            newTab.location.href = toolUrl;
            showToast('5 credits deducted. Tool unlocked!', 'success');
            logTransaction('tool_access', document.getElementById('modalToolName').textContent, -5);
        } else {
            newTab.close();
            showToast('Tool link unavailable. Please contact support.', 'error');
        }
    }).catch((error) => {
        isProcessingTool = false;
        if (newTab) newTab.close();
        closeModal();
        if (error.message === 'Insufficient credits') {
            showInsufficientCredits(5);
        } else {
            showToast(error.message, 'error');
        }
    });
}

function filterTools(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    const searchTerm = document.getElementById('toolSearchInput')?.value || '';
    renderTools(category, searchTerm);
}

function searchTools() {
    const searchInput = document.getElementById('toolSearchInput');
    if (!searchInput) return;
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    renderTools(activeCategory, searchTerm);
}

function checkUrlCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) filterTools(category);
}

function getCategoryName(category) {
    const names = {
        'ai': 'AI Tools', 'photo': 'Photo AI', 'video': 'Video Makers',
        'osint': 'OSINT', 'telegram': 'Telegram Bots', 'encoder': 'Encoders',
        'social': 'Social Media', 'mods': 'Mod Apps', 'hacking': 'Hacking',
        'prank': 'Prank', 'courses': 'Courses', 'gaming': 'Gaming',
        'fonts': 'Fonts', 'utility': 'Utilities', 'premium': 'Premium'
    };
    return names[category] || category;
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }
}

function initContactLinks() {
    document.querySelectorAll('[data-whatsapp]').forEach(el => el.href = CONFIG.WHATSAPP_LINK);
    document.querySelectorAll('[data-telegram]').forEach(el => el.href = CONFIG.TELEGRAM_LINK);
    document.querySelectorAll('[data-email]').forEach(el => el.href = CONFIG.EMAIL_LINK);
}

function initProfileImage() {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) profileImg.src = CONFIG.PROFILE_IMAGE;
}

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
    toast.innerHTML = `<i class="${icons[type] || icons.info}"></i><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    return String(text).replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

window.onclick = function(event) {
    if (event.target === document.getElementById('visitModal')) closeModal();
    if (event.target === document.getElementById('authModal')) closeAuthModal();
    if (event.target === document.getElementById('insufficientModal')) closeInsufficientModal();
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeAuthModal();
        closeInsufficientModal();
    }
});
