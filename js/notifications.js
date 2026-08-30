// ============================================
// FAHAD TECH - NOTIFICATIONS SYSTEM
// ============================================

// ============ LOAD USER NOTIFICATIONS ============
async function loadUserNotifications(userId) {
    try {
        const snapshot = await notificationsCollection
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .limit(20)
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
        container.innerHTML = '<p style="color:#fff;opacity:0.6;text-align:center;">No notifications yet</p>';
        return;
    }
    
    container.innerHTML = notifications.map(notif => `
        <div class="notification-item ${notif.read ? 'read' : 'unread'}" style="
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 12px 14px;
            margin-bottom: 8px;
            ${!notif.read ? 'border-left: 3px solid #FFD700;' : ''}
        ">
            <strong style="color:${notif.read ? '#a0a0b8' : '#FFD700'};">${notif.title}</strong>
            <p style="color:#c0c0d0;font-size:12px;margin-top:4px;">${notif.message}</p>
            <span style="font-size:10px;color:#a0a0b8;">
                ${notif.createdAt ? new Date(notif.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
            </span>
        </div>
    `).join('');
}

// ============ MARK NOTIFICATION READ ============
async function markNotificationRead(notificationId) {
    try {
        await notificationsCollection.doc(notificationId).update({
            read: true
        });
        return { success: true };
    } catch (error) {
        console.error('Error marking notification read:', error);
        return { success: false };
    }
}

// ============ GET UNREAD COUNT ============
async function getUnreadNotificationCount(userId) {
    try {
        const snapshot = await notificationsCollection
            .where('userId', '==', userId)
            .where('read', '==', false)
            .get();
        
        return snapshot.size;
    } catch (error) {
        console.error('Error getting unread count:', error);
        return 0;
    }
}
