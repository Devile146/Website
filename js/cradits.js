// ============================================
// FAHAD TECH - CREDIT SYSTEM
// ============================================

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

// ============ DEDUCT TOOL CREDITS ============
async function deductToolCredits(toolName, cost = 5) {
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
    
    if (credits < cost) {
        showPurchaseModal('You need ' + cost + ' credits. Current: ' + credits);
        return { success: false, error: 'Insufficient credits' };
    }
    
    try {
        const userRef = usersCollection.doc(user.uid);
        
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error('User not found');
            }
            
            const currentCredits = userDoc.data().credits || 0;
            if (currentCredits < cost) {
                throw new Error('Insufficient credits');
            }
            
            transaction.update(userRef, {
                credits: currentCredits - cost
            });
        });
        
        await transactionsCollection.add({
            userId: user.uid,
            userEmail: user.email,
            type: 'tool_access',
            toolName: toolName,
            creditsUsed: cost,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await notificationsCollection.add({
            userId: user.uid,
            title: 'Tool Accessed',
            message: toolName + ' accessed. ' + cost + ' credits deducted.',
            type: 'tool_access',
            read: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true, creditsDeducted: cost };
    } catch (error) {
        console.error('Error deducting credits:', error);
        alert('Error processing request. Please try again.');
        return { success: false, error: error.message };
    }
}

// ============ ADD CREDITS (Admin) ============
async function addCreditsToUser(userId, amount, reason = 'Admin added') {
    try {
        const userRef = usersCollection.doc(userId);
        
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error('User not found');
            }
            
            const currentCredits = userDoc.data().credits || 0;
            transaction.update(userRef, {
                credits: currentCredits + amount
            });
        });
        
        await notificationsCollection.add({
            userId: userId,
            title: 'Credits Added',
            message: amount + ' credits added to your account. ' + reason,
            type: 'credits_added',
            read: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error adding credits:', error);
        return { success: false, error: error.message };
    }
}

// ============ SET CREDITS (Admin) ============
async function setUserCredits(userId, amount) {
    try {
        await usersCollection.doc(userId).update({
            credits: amount
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error setting credits:', error);
        return { success: false, error: error.message };
    }
}
