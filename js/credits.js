// ==========================================
// FAHAD TECH - CREDIT SYSTEM (STRICT TRANSACTION)
// ==========================================

const TOOLKIT_COST = 25;
const TOOL_COST = 5;

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
        
        const currentCredits = typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
        
        if (currentCredits < requiredCredits) {
            reject(new Error('Insufficient credits'));
            return;
        }
        
        resolve(currentCredits);
    });
}

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
                const currentCredits = typeof userData.credits === 'number' ? userData.credits : 0;
                
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

function updateCreditsDisplay(credits) {
    const validCredits = typeof credits === 'number' ? credits : 0;
    
    const navCredits = document.getElementById('navCredits');
    if (navCredits) {
        navCredits.textContent = validCredits;
    }
    
    const accountCredits = document.getElementById('accountCredits');
    if (accountCredits) {
        accountCredits.textContent = validCredits;
    }
    
    const currentCreditsDisplay = document.getElementById('currentCreditsDisplay');
    if (currentCreditsDisplay) {
        currentCreditsDisplay.textContent = validCredits;
    }
    
    const unlockCurrentCredits = document.getElementById('unlockCurrentCredits');
    if (unlockCurrentCredits) {
        unlockCurrentCredits.textContent = validCredits;
    }
}

function showInsufficientCredits(required = 25) {
    const modal = document.getElementById('insufficientModal');
    const currentCreditsDisplay = document.getElementById('currentCreditsDisplay');
    const requiredCreditsDisplay = document.getElementById('requiredCreditsDisplay');
    
    const credits = currentUserData && typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
    
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

function closeInsufficientModal() {
    const modal = document.getElementById('insufficientModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function goToBuyCredits() {
    closeInsufficientModal();
    window.location.href = 'buy-credits.html';
}

function checkToolAccess(toolName, toolLink) {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    if (currentUserData && currentUserData.accountStatus === 'disabled') {
        showToast('Your account is currently disabled. Please contact support.', 'error');
        return;
    }
    
    const credits = currentUserData && typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
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
