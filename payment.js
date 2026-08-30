// ============================================
// FAHAD TECH - PAYMENT SYSTEM
// ============================================

// ============ LOAD PRICING PACKAGES ============
async function loadPricingPackages() {
    const container = document.getElementById('pricingContainer');
    if (!container) return;
    
    try {
        const snapshot = await packagesCollection.where('active', '==', true).get();
        
        const packages = [];
        snapshot.forEach(doc => {
            packages.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        displayPackages(packages);
    } catch (error) {
        console.error('Error loading packages:', error);
    }
}

// ============ DISPLAY PACKAGES ============
function displayPackages(packages) {
    const container = document.getElementById('pricingContainer');
    
    container.innerHTML = packages.map((pkg, index) => {
        const hasDiscount = pkg.originalPrice > pkg.price;
        
        return `
        <div class="pricing-card ${index === 1 ? 'featured' : ''}" style="
            background: rgba(255,255,255,0.06);
            border: 1px solid ${index === 1 ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.10)'};
            border-radius: 16px;
            padding: 25px;
            text-align: center;
            position: relative;
        ">
            ${index === 1 ? '<span style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#FFD700,#FF8C42);color:#000;padding:4px 12px;border-radius:20px;font-size:10px;font-weight:700;">MOST POPULAR</span>' : ''}
            
            <h3 style="color:#fff;font-size:18px;margin-bottom:10px;">${pkg.name}</h3>
            
            <div style="font-size:36px;font-weight:900;color:#FFD700;">
                ${pkg.credits} <span style="font-size:14px;color:#c0c0d0;">Credits</span>
            </div>
            
            <div style="margin:15px 0;">
                ${hasDiscount ? `
                    <span style="color:#FF4D91;text-decoration:line-through;font-size:16px;margin-right:8px;">
                        Rs. ${pkg.originalPrice}
                    </span>
                ` : ''}
                <span style="color:#fff;font-size:24px;font-weight:800;">
                    Rs. ${pkg.price}
                </span>
            </div>
            
            ${hasDiscount ? `
                <div style="color:#4ade80;font-size:12px;margin-bottom:15px;">
                    Save Rs. ${pkg.originalPrice - pkg.price}!
                </div>
            ` : '<div style="margin-bottom:15px;"></div>'}
            
            <button onclick="selectPackage('${pkg.id}', '${pkg.name}', ${pkg.credits}, ${pkg.price})" style="
                width:100%;
                padding:12px;
                background:linear-gradient(135deg,#6D5CFF,#FF4D91);
                border:none;
                border-radius:10px;
                color:#fff;
                font-size:14px;
                font-weight:700;
                cursor:pointer;
            ">
                Select Package
            </button>
        </div>
        `;
    }).join('');
}

// ============ SELECT PACKAGE ============
let selectedPackage = null;

function selectPackage(packageId, packageName, credits, price) {
    selectedPackage = {
        id: packageId,
        name: packageName,
        credits: credits,
        price: price
    };
    
    // Show payment modal
    const modal = document.getElementById('paymentModal');
    if (modal) {
        document.getElementById('paymentPackageName').textContent = packageName;
        document.getElementById('paymentCredits').textContent = credits + ' Credits';
        document.getElementById('paymentAmount').textContent = 'Rs. ' + price;
        modal.style.display = 'flex';
    }
    
    // Load payment settings
    loadPaymentSettings();
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ============ LOAD PAYMENT SETTINGS ============
async function loadPaymentSettings() {
    try {
        const doc = await settingsCollection.doc('paymentSettings').get();
        if (doc.exists) {
            const settings = doc.data();
            
            // Display Easypaisa
            if (settings.easypaisaActive) {
                document.getElementById('easypaisaInfo').innerHTML = `
                    <strong style="color:#4ade80;">Easypaisa</strong><br>
                    Name: ${settings.easypaisaName}<br>
                    Number: ${settings.easypaisaNumber}
                `;
            }
            
            // Display JazzCash
            if (settings.jazzcashActive) {
                document.getElementById('jazzcashInfo').innerHTML = `
                    <strong style="color:#FF4D91;">JazzCash</strong><br>
                    Name: ${settings.jazzcashName}<br>
                    Number: ${settings.jazzcashNumber}
                `;
            }
            
            // Instructions
            document.getElementById('paymentInstructions').textContent = settings.instructions || '';
        }
    } catch (error) {
        console.error('Error loading payment settings:', error);
    }
}

// ============ SUBMIT PURCHASE REQUEST ============
async function submitPurchaseRequest() {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'auth.html';
        return;
    }
    
    if (!selectedPackage) {
        alert('Please select a package first.');
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const transactionId = document.getElementById('transactionId').value.trim();
    const screenshotFile = document.getElementById('screenshotUpload').files[0];
    
    if (!screenshotFile) {
        alert('Please upload payment screenshot.');
        return;
    }
    
    try {
        // Upload screenshot to Firebase Storage
        const storageRef = storage.ref('payment_screenshots/' + user.uid + '/' + Date.now() + '_' + screenshotFile.name);
        const uploadResult = await storageRef.put(screenshotFile);
        const screenshotUrl = await uploadResult.ref.getDownloadURL();
        
        // Create purchase request
        await purchasesCollection.add({
            userId: user.uid,
            userEmail: user.email,
            packageId: selectedPackage.id,
            packageName: selectedPackage.name,
            credits: selectedPackage.credits,
            price: selectedPackage.price,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
            screenshotUrl: screenshotUrl,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Create notification
        await notificationsCollection.add({
            userId: user.uid,
            title: 'Payment Request Submitted',
            message: 'Your payment request for ' + selectedPackage.credits + ' credits is being reviewed.',
            type: 'purchase',
            read: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        alert('Payment request submitted! Wait for admin approval.');
        closePaymentModal();
        window.location.href = 'account.html';
        
    } catch (error) {
        console.error('Error submitting purchase:', error);
        alert('Error submitting request. Please try again.');
    }
}

// ============ LOAD PURCHASE HISTORY ============
async function loadPurchaseHistory() {
    const user = auth.currentUser;
    if (!user) return;
    
    const container = document.getElementById('purchaseHistoryContainer');
    if (!container) return;
    
    try {
        const snapshot = await purchasesCollection
            .where('userId', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .get();
        
        const purchases = [];
        snapshot.forEach(doc => {
            purchases.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        if (purchases.length === 0) {
            container.innerHTML = '<p style="color:#c0c0d0;text-align:center;">No purchase history yet.</p>';
            return;
        }
        
        container.innerHTML = purchases.map(purchase => `
            <div style="
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.10);
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 10px;
            ">
                <strong style="color:#fff;">${purchase.packageName}</strong>
                <span style="color:#c0c0d0;"> - ${purchase.credits} Credits</span>
                <div style="color:#c0c0d0;font-size:12px;margin-top:5px;">
                    Amount: Rs. ${purchase.price} | Method: ${purchase.paymentMethod}
                </div>
                <div style="margin-top:8px;">
                    ${purchase.status === 'pending' ? '<span style="color:#FFD700;">⏳ Processing</span>' : 
                      purchase.status === 'approved' ? '<span style="color:#4ade80;">✅ Approved</span>' : 
                      '<span style="color:#FF4D91;">❌ Rejected</span>'}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading purchases:', error);
    }
}