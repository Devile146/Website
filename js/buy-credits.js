// =========================================================
// BUY CREDITS - DYNAMIC PRICING PACKAGES & PAYMENT SYSTEM
// =========================================================

var selectedPackage = {
    credits: 0,
    price: 0
};

// Payment details
const paymentDetails = {
    easypaisa: {
        name: 'FAHAD ALI',
        number: '03251138960',
        instructions: 'Send payment to the EasyPaisa number below and enter the transaction ID.'
    },
    jazzcash: {
        name: 'FAHAD ALI',
        number: '03251138960',
        instructions: 'Send payment to the JazzCash number below and enter the transaction ID.'
    },
    bank: {
        name: 'FAHAD ALI',
        accountNumber: 'PK00XXXX0000000000000',
        bankName: 'Bank Name',
        instructions: 'Transfer payment to the bank account below and enter the reference number.'
    }
};

// Auth state listener
auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        loadUserData(user);
        showPricingContent();
    } else {
        currentUser = null;
        currentUserData = null;
        showLoginRequired();
        showGuestState();
    }
});

function loadUserData(user) {
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            currentUserData = doc.data();
            currentUserData.credits = typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
            updateUserUI(user, currentUserData);
        }
    }).catch((error) => {
        console.error("Error loading user data:", error);
    });
}

function showPricingContent() {
    const loginReq = document.getElementById('loginRequired');
    const pricing = document.getElementById('pricingContent');
    if (loginReq) loginReq.style.display = 'none';
    if (pricing) pricing.style.display = 'block';
    
    // Load dynamic packages from Firestore
    loadPricingPackages();
}

function showLoginRequired() {
    const loginReq = document.getElementById('loginRequired');
    const pricing = document.getElementById('pricingContent');
    if (loginReq) loginReq.style.display = 'flex';
    if (pricing) pricing.style.display = 'none';
}

// =========================================================
// LOAD PRICING PACKAGES DIRECTLY FROM FIRESTORE (ADMIN SYNC)
// =========================================================
function loadPricingPackages() {
    const pricingGrid = document.getElementById('pricingGrid');
    if (!pricingGrid) return;

    db.collection('pricingPackages').get().then((snapshot) => {
        let packages = [];
        snapshot.forEach((doc) => {
            packages.push({ id: doc.id, ...doc.data() });
        });

        if (packages.length === 0) {
            // Default packages if database is empty
            packages = [
                { credits: 50, price: 120, label: 'Starter' },
                { credits: 100, price: 210, label: 'Most Popular' },
                { credits: 250, price: 400, label: 'Premium' }
            ];
        } else {
            // Sort by price ascending
            packages.sort((a, b) => (a.price || 0) - (b.price || 0));
        }

        renderPricingCards(packages);
    }).catch((err) => {
        console.error("Error loading pricing packages:", err);
    });
}

function renderPricingCards(packages) {
    const pricingGrid = document.getElementById('pricingGrid');
    if (!pricingGrid) return;

    pricingGrid.innerHTML = packages.map((pkg, index) => {
        const isPopular = (pkg.label || '').toLowerCase().includes('popular') || index === 1;
        const savingsText = pkg.credits >= 100 ? `Save Rs. ${Math.max(0, Math.round(pkg.credits * 2.4 - pkg.price))}` : '';
        
        return `
            <div class="pricing-card ${isPopular ? 'popular' : ''}">
                <div class="pricing-badge ${isPopular ? 'popular-badge' : ''}">${escapeHtml(pkg.label || 'Package')}</div>
                <div class="pricing-icon"><i class="${pkg.credits >= 200 ? 'fas fa-crown' : 'fas fa-coins'}"></i></div>
                <h3>${pkg.credits} Credits</h3>
                <div class="pricing-amount">Rs. ${pkg.price}</div>
                ${savingsText && savingsText !== 'Save Rs. 0' ? `<div class="pricing-save">${savingsText}</div>` : ''}
                <div class="pricing-details">
                    <span><i class="fas fa-check"></i> ${pkg.credits} Tool Access</span>
                    <span><i class="fas fa-check"></i> Valid Forever</span>
                    ${isPopular ? `<span><i class="fas fa-check"></i> Best Value</span>` : ''}
                </div>
                <button class="select-package-btn" onclick="selectPackage(${pkg.credits}, ${pkg.price})">
                    <i class="fas fa-shopping-cart"></i> Select Package
                </button>
            </div>
        `;
    }).join('');
}

// Select package
function selectPackage(credits, price) {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    selectedPackage.credits = credits;
    selectedPackage.price = price;
    
    const textEl = document.getElementById('selectedPackageText');
    if (textEl) {
        textEl.textContent = `${credits} Credits - Rs. ${price}`;
    }
    
    openPaymentModal();
}

// Open payment modal
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) modal.style.display = 'flex';
    updatePaymentInstructions('easypaisa');
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) modal.style.display = 'none';
}

// Update payment instructions based on method
document.addEventListener('change', function(e) {
    if (e.target && e.target.name === 'paymentMethod') {
        updatePaymentInstructions(e.target.value);
    }
});

function updatePaymentInstructions(method) {
    const instructionsDiv = document.getElementById('paymentInstructions');
    if (!instructionsDiv) return;
    
    const details = paymentDetails[method] || paymentDetails.easypaisa;
    
    if (method === 'easypaisa' || method === 'jazzcash') {
        instructionsDiv.innerHTML = `
            <strong>${method === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} Payment Details:</strong>
            <p>Name: ${details.name}</p>
            <p>Number: ${details.number}</p>
            <p>Amount: Rs. ${selectedPackage.price}</p>
            <p style="margin-top: 5px;">${details.instructions}</p>
        `;
    } else {
        instructionsDiv.innerHTML = `
            <strong>Bank Transfer Details:</strong>
            <p>Account Name: ${details.name}</p>
            <p>Account Number: ${details.accountNumber}</p>
            <p>Bank: ${details.bankName}</p>
            <p>Amount: Rs. ${selectedPackage.price}</p>
            <p style="margin-top: 5px;">${details.instructions}</p>
        `;
    }
}

// Submit payment request
function submitPaymentRequest() {
    if (!currentUser) {
        showToast('Please login first', 'error');
        return;
    }
    
    const payerName = document.getElementById('payerName').value.trim();
    const payerPhone = document.getElementById('payerPhone').value.trim();
    const transactionId = document.getElementById('transactionId').value.trim();
    const selectedMethodRadio = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentMethod = selectedMethodRadio ? selectedMethodRadio.value : 'easypaisa';
    const submitBtn = document.getElementById('submitPaymentBtn');
    
    if (!payerName || !payerPhone || !transactionId) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (selectedPackage.credits === 0 || selectedPackage.price === 0) {
        showToast('Please select a package', 'error');
        return;
    }
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    }
    
    const requestData = {
        userId: currentUser.uid,
        userEmail: currentUser.email || '',
        userName: (currentUserData && currentUserData.displayName) || payerName,
        packageCredits: selectedPackage.credits,
        packagePrice: selectedPackage.price,
        paymentMethod: paymentMethod,
        payerName: payerName,
        payerPhone: payerPhone,
        transactionId: transactionId,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('purchaseRequests').add(requestData).then(() => {
        showToast('Payment request submitted successfully!', 'success');
        closePaymentModal();
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Payment Request';
        }
        
        document.getElementById('payerName').value = '';
        document.getElementById('payerPhone').value = '';
        document.getElementById('transactionId').value = '';
        
        setTimeout(() => {
            showToast('Your request is pending. Credits will be added after admin approval.', 'info');
        }, 1500);
    }).catch((error) => {
        showToast('Error submitting request: ' + error.message, 'error');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Payment Request';
        }
    });
            }
