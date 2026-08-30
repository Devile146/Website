// ============================================
// FAHAD TECH - CREDIT SYSTEM
// ============================================

const TOOL_CREDIT_COST = 2;
const TOOLKIT_MAKER_COST = 15;

// ============ CHECK CREDITS ============
async function checkCredits(userId) {
    try {
        const doc = await usersCollection.doc(userId).get();
        if (doc.exists) {
            return doc.data().credits || 0;
        }
        return 0;
    } catch (error) {
        console.error('Error checking credits:', error);
        return 0;
    }
}

// ============ SHOW CREDIT CONFIRMATION MODAL ============
function showCreditConfirmation(toolName, cost, balance) {
    return new Promise((resolve) => {
        const modal = document.getElementById('creditConfirmModal');
        if (modal) {
            document.getElementById('confirmToolName').textContent = toolName;
            document.getElementById('confirmCost').textContent = cost + ' Credits';
            document.getElementById('confirmBalance').textContent = balance + ' Credits';
            modal.style.display = 'flex';
            
            document.getElementById('confirmYesBtn').onclick = async function() {
                modal.style.display = 'none';
                resolve(true);
            };
            
            document.getElementById('confirmNoBtn').onclick = function() {
                modal.style.display = 'none';
                resolve(false);
            };
        } else {
            resolve(false);
        }
    });
}

// ============ SHOW INSUFFICIENT CREDITS MODAL ============
function showInsufficientCredits(needCredits, currentCredits) {
    const modal = document.getElementById('insufficientModal');
    if (modal) {
        document.getElementById('needCreditsDisplay').textContent = needCredits;
        document.getElementById('currentCreditsDisplay').textContent = currentCredits;
        modal.style.display = 'flex';
    }
}

function closeInsufficientModal() {
    const modal = document.getElementById('insufficientModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function goToPricing() {
    window.location.href = 'pricing.html';
}

// ============ DEDUCT TOOL CREDITS (Firestore Transaction) ============
async function deductToolCredits(toolName, toolLink) {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'auth.html';
        return { success: false, error: 'Not logged in' };
    }
    
    // Check account status
    const userData = await getCurrentUserData();
    if (!userData || userData.accountStatus !== 'active') {
        alert('Your account is currently inactive.');
        return { success: false, error: 'Account inactive' };
    }
    
    // Check credits
    const credits = await checkCredits(user.uid);
    
    if (credits < TOOL_CREDIT_COST) {
        showInsufficientCredits(TOOL_CREDIT_COST, credits);
        return { success: false, error: 'Insufficient credits' };
    }
    
    // Show confirmation
    const confirmed = await showCreditConfirmation(toolName, TOOL_CREDIT_COST, credits);
    
    if (!confirmed) {
        return { success: false, cancelled: true };
    }
    
    // Process deduction
    try {
        const userRef = usersCollection.doc(user.uid);
        
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error('User not found');
            }
            
            const currentCredits = userDoc.data().credits || 0;
            if (currentCredits < TOOL_CREDIT_COST) {
                throw new Error('Insufficient credits');
            }
            
            transaction.update(userRef, {
                credits: currentCredits - TOOL_CREDIT_COST
            });
        });
        
        // Record transaction
        await transactionsCollection.add({
            userId: user.uid,
            userEmail: user.email,
            type: 'tool_access',
            toolName: toolName,
            creditsUsed: TOOL_CREDIT_COST,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Create notification
        await notificationsCollection.add({
            userId: user.uid,
            title: 'Tool Accessed',
            message: toolName + ' accessed. ' + TOOL_CREDIT_COST + ' credits deducted.',
            type: 'tool_access',
            read: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Update display
        loadUserCredits(user.uid);
        
        // Open tool
        window.open(toolLink, '_blank');
        
        return { success: true, creditsDeducted: TOOL_CREDIT_COST };
    } catch (error) {
        console.error('Error deducting credits:', error);
        alert('Error processing request. Please try again.');
        return { success: false, error: error.message };
    }
}

// ============ DEDUCT TOOLKIT MAKER CREDITS ============
async function deductToolkitMakerCredits() {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'auth.html';
        return { success: false, error: 'Not logged in' };
    }
    
    const userData = await getCurrentUserData();
    if (!userData || userData.accountStatus !== 'active') {
        alert('Your account is currently inactive.');
        return { success: false, error: 'Account inactive' };
    }
    
    const credits = await checkCredits(user.uid);
    
    if (credits < TOOLKIT_MAKER_COST) {
        showInsufficientCredits(TOOLKIT_MAKER_COST, credits);
        return { success: false, error: 'Insufficient credits' };
    }
    
    const confirmed = await showCreditConfirmation('Toolkit Maker', TOOLKIT_MAKER_COST, credits);
    
    if (!confirmed) {
        return { success: false, cancelled: true };
    }
    
    try {
        const userRef = usersCollection.doc(user.uid);
        
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error('User not found');
            }
            
            const currentCredits = userDoc.data().credits || 0;
            if (currentCredits < TOOLKIT_MAKER_COST) {
                throw new Error('Insufficient credits');
            }
            
            transaction.update(userRef, {
                credits: currentCredits - TOOLKIT_MAKER_COST
            });
        });
        
        await transactionsCollection.add({
            userId: user.uid,
            userEmail: user.email,
            type: 'toolkit_maker_access',
            creditsUsed: TOOLKIT_MAKER_COST,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await notificationsCollection.add({
            userId: user.uid,
            title: 'Toolkit Maker Access',
            message: 'Toolkit Maker accessed. ' + TOOLKIT_MAKER_COST + ' credits deducted.',
            type: 'toolkit_access',
            read: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        loadUserCredits(user.uid);
        
        window.location.href = 'toolkit-maker.html';
        
        return { success: true, creditsDeducted: TOOLKIT_MAKER_COST };
    } catch (error) {
        console.error('Error deducting credits:', error);
        alert('Error processing request. Please try again.');
        return { success: false, error: error.message };
    }
}