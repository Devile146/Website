// =========================
// FAHAD TECH - CREDIT SYSTEM
// =========================

const TOOLKIT_COST = 25;
const TOOL_COST = 5;

// Check if user has enough credits
function checkCredits(requiredCredits) {
    return new Promise((resolve, reject) => {
        if (!currentUser) {
            reject(new Error('Please login first'));
            return;
        }
        
        if (!currentUserData) {
            reject(new Error('User data not loaded'));
            return;
        }
        
        if (currentUserData.accountStatus === 'disabled') {
            reject(new Error('Your account is currently disabled. Please contact support.'));
            return;
        }
        
        if ((currentUserData.credits || 0) < requiredCredits) {
            reject(new Error('Insufficient credits'));
            return;
        }
        
        resolve(currentUserData.credits);
    });
}

// Deduct credits using Firestore transaction
function deductCredits(amount, action, details) {
    return new Promise((resolve, reject) => {
        if (!currentUser) {
            reject(new Error('Please login first'));
            return;
        }
        
        const userRef = db.collection('users').doc(currentUser.uid);
        
        db.runTransaction((transaction) => {
            return transaction.get(userRef).then((doc) => {
                if (!doc.exists) {
                    throw new Error('User data not found');
                }
                
                const userData = doc.data();
                const currentCredits = userData.credits || 0;
                
                if (userData.accountStatus === 'disabled') {
                    throw new Error('Account is disabled');
                }
                
                if (currentCredits < amount) {
                    throw new Error('Insufficient credits');
                }
                
                const newCredits = currentCredits - amount;
                
                transaction.update(userRef, {
                    credits: newCredits,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                return newCredits;
            });
        }).then((newCredits) => {
            if (currentUserData) {
                currentUserData.credits = newCredits;
            }
            
            updateCreditsDisplay(newCredits);
            logTransaction(action, details, -amount);
            
            resolve(newCredits);
        }).catch((error) => {
            reject(error);
        });
    });
}

// Log transaction
function logTransaction(action, details, amount) {
    if (!currentUser) return;
    const transactionData = {
        userId: currentUser.uid,
        userEmail: currentUser.email || '',
        action: action,
        details: details || '',
        amount: amount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('transactions').add(transactionData).catch((error) => {
        console.error("Error logging transaction:", error);
    });
}

// Update credits display
function updateCreditsDisplay(credits) {
    const navCredits = document.getElementById('navCredits');
    if (navCredits) {
        navCredits.textContent = credits;
    }
    
    const accountCredits = document.getElementById('accountCredits');
    if (accountCredits) {
        accountCredits.textContent = credits;
    }
    
    const currentCreditsDisplay = document.getElementById('currentCreditsDisplay');
    if (currentCreditsDisplay) {
        currentCreditsDisplay.textContent = credits;
    }
    
    const unlockCurrentCredits = document.getElementById('unlockCurrentCredits');
    if (unlockCurrentCredits) {
        unlockCurrentCredits.textContent = credits;
    }
}

// Show insufficient credits modal
function showInsufficientCredits(required = 25) {
    const modal = document.getElementById('insufficientModal');
    const currentCreditsDisplay = document.getElementById('currentCreditsDisplay');
    const requiredCreditsDisplay = document.getElementById('requiredCreditsDisplay');
    
    const credits = currentUserData ? (currentUserData.credits || 0) : 0;
    
    if (currentCreditsDisplay) {
        currentCreditsDisplay.textContent = credits;
    }
    if (requiredCreditsDisplay) {
        requiredCreditsDisplay.textContent = required;
    }
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close insufficient credits modal
function closeInsufficientModal() {
    const modal = document.getElementById('insufficientModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Go to buy credits
function goToBuyCredits() {
    closeInsufficientModal();
    window.location.href = 'buy-credits.html';
}

// Check tool access (5 Credits)
function checkToolAccess(toolName, toolLink) {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    if (currentUserData && currentUserData.accountStatus === 'disabled') {
        showToast('Your account is currently disabled. Please contact support.', 'error');
        return;
    }
    
    const credits = currentUserData ? (currentUserData.credits || 0) : 0;
    if (credits < TOOL_COST) {
        showInsufficientCredits(TOOL_COST);
        return;
    }
    
    deductCredits(TOOL_COST, 'tool_open', toolName).then(() => {
        window.open(toolLink, '_blank');
    }).catch((error) => {
        showToast(error.message, 'error');
    });
                                                         }
