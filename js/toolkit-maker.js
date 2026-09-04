// =========================
// TOOLKIT MAKER - COMPLETE SCRIPT
// =========================

const themes = [
    {
        id: 'hacker',
        name: 'Hacker Type',
        bg: 'linear-gradient(135deg, #0a0a0a, #001a00)',
        accent: '#00ff00',
        cardBg: 'rgba(0, 20, 0, 0.8)',
        textColor: '#00ff00',
        font: 'monospace'
    },
    {
        id: 'clean',
        name: 'Clean UI',
        bg: 'linear-gradient(135deg, #f5f5f5, #ffffff)',
        accent: '#3B82F6',
        cardBg: 'rgba(255, 255, 255, 0.9)',
        textColor: '#1a1a1a',
        font: 'Inter, sans-serif'
    },
    {
        id: 'neon',
        name: 'Neon Cyber',
        bg: 'linear-gradient(135deg, #0a0a2e, #1a0030)',
        accent: '#ff00ff',
        cardBg: 'rgba(20, 0, 40, 0.8)',
        textColor: '#00ffff',
        font: 'Orbitron, sans-serif'
    },
    {
        id: 'glass',
        name: 'Glassmorphism',
        bg: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        accent: '#6D5CFF',
        cardBg: 'rgba(255, 255, 255, 0.1)',
        textColor: '#F5F5FF',
        font: 'Inter, sans-serif'
    },
    {
        id: 'gradient',
        name: 'Modern Gradient',
        bg: 'linear-gradient(135deg, #667eea, #764ba2)',
        accent: '#ffd700',
        cardBg: 'rgba(255, 255, 255, 0.15)',
        textColor: '#ffffff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'dark',
        name: 'Dark Premium',
        bg: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
        accent: '#ffd700',
        cardBg: 'rgba(30, 30, 30, 0.9)',
        textColor: '#ffffff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'minimal',
        name: 'Minimal White',
        bg: '#ffffff',
        accent: '#333333',
        cardBg: '#f8f8f8',
        textColor: '#333333',
        font: 'Inter, sans-serif'
    },
    {
        id: 'futuristic',
        name: 'Futuristic Blue',
        bg: 'linear-gradient(135deg, #0a0a2e, #003366)',
        accent: '#00d4ff',
        cardBg: 'rgba(0, 40, 80, 0.8)',
        textColor: '#00d4ff',
        font: 'Orbitron, sans-serif'
    },
    {
        id: 'purple',
        name: 'Purple Galaxy',
        bg: 'linear-gradient(135deg, #1a0030, #0a0a2e)',
        accent: '#9b59b6',
        cardBg: 'rgba(30, 0, 50, 0.8)',
        textColor: '#d4a5ff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'rgb',
        name: 'RGB Tech',
        bg: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
        accent: '#ffffff',
        cardBg: 'rgba(0, 0, 0, 0.7)',
        textColor: '#ffffff',
        font: 'Orbitron, sans-serif'
    },
    {
        id: 'elegant',
        name: 'Elegant Professional',
        bg: 'linear-gradient(135deg, #2c3e50, #3498db)',
        accent: '#ecf0f1',
        cardBg: 'rgba(255, 255, 255, 0.12)',
        textColor: '#ecf0f1',
        font: 'Georgia, serif'
    },
    {
        id: 'colorful',
        name: 'Colorful Modern',
        bg: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
        accent: '#ffffff',
        cardBg: 'rgba(255, 255, 255, 0.2)',
        textColor: '#ffffff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'midnight',
        name: 'Midnight Tech',
        bg: 'linear-gradient(135deg, #0a0a1a, #1a1a3a)',
        accent: '#4169e1',
        cardBg: 'rgba(10, 10, 30, 0.8)',
        textColor: '#87ceeb',
        font: 'Inter, sans-serif'
    },
    {
        id: 'aurora',
        name: 'Aurora',
        bg: 'linear-gradient(135deg, #00b4db, #0083b0, #00b4db)',
        accent: '#ffd700',
        cardBg: 'rgba(0, 60, 80, 0.7)',
        textColor: '#ffffff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'dashboard',
        name: 'Advanced Dashboard',
        bg: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        accent: '#6D5CFF',
        cardBg: 'rgba(255, 255, 255, 0.08)',
        textColor: '#F5F5FF',
        font: 'Inter, sans-serif'
    }
];

// State
let products = [];
let selectedTheme = 'glass';
let profileImageData = null;
let editingProductIndex = -1;
let isGenerating = false;
let isToolkitUnlocked = false;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    renderThemes();
    initProductForm();
});

function initProductForm() {
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.style.display = 'none';
    }
    renderProducts();
}

// Check and show the 25 Credits Unlock screen
function initToolkitPage(user) {
    const loadingOverlay = document.getElementById('toolkitLoadingOverlay');
    const mainContent = document.getElementById('toolkitMainContent');
    const unlockPrompt = document.getElementById('toolkitUnlockPrompt');
    const protectedAccess = document.getElementById('protectedAccess');
    
    if (!user) {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        if (unlockPrompt) unlockPrompt.style.display = 'none';
        if (protectedAccess) protectedAccess.style.display = 'flex';
        return;
    }
    
    // Fetch latest user data from Firestore
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        
        currentUserData = doc.exists ? doc.data() : { credits: 0, accountStatus: 'active' };
        updateUserUI(user, currentUserData);
        
        if (currentUserData.accountStatus === 'disabled') {
            if (mainContent) mainContent.style.display = 'none';
            if (unlockPrompt) unlockPrompt.style.display = 'none';
            if (protectedAccess) {
                protectedAccess.innerHTML = `
                    <div class="protected-box">
                        <div class="protected-icon"><i class="fas fa-ban"></i></div>
                        <h2>Account Disabled</h2>
                        <p>Your account is currently disabled. Please contact support.</p>
                    </div>
                `;
                protectedAccess.style.display = 'flex';
            }
            return;
        }
        
        if (isToolkitUnlocked) {
            // Already unlocked during this session
            if (unlockPrompt) unlockPrompt.style.display = 'none';
            if (protectedAccess) protectedAccess.style.display = 'none';
            if (mainContent) mainContent.style.display = 'block';
        } else {
            // Show 25 credits unlock prompt
            if (protectedAccess) protectedAccess.style.display = 'none';
            if (mainContent) mainContent.style.display = 'none';
            if (unlockPrompt) {
                unlockPrompt.style.display = 'flex';
                const currentCredsEl = document.getElementById('unlockCurrentCredits');
                if (currentCredsEl) {
                    currentCredsEl.textContent = currentUserData.credits || 0;
                }
            }
        }
    }).catch((err) => {
        console.error("Error loading user state:", err);
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (unlockPrompt) unlockPrompt.style.display = 'flex';
    });
}

// User clicks "Unlock Now (25 Credits)"
function payAndOpenToolkit() {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    const credits = currentUserData ? (currentUserData.credits || 0) : 0;
    
    if (credits < 25) {
        showInsufficientCredits(25);
        return;
    }
    
    const unlockBtn = document.getElementById('unlockToolkitBtn');
    if (unlockBtn) {
        unlockBtn.disabled = true;
        unlockBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deducting 25 Credits...';
    }
    
    deductCredits(25, 'toolkit_maker_unlock', 'Toolkit Maker feature access').then((newCredits) => {
        isToolkitUnlocked = true;
        showToast('25 credits deducted! Toolkit Maker unlocked.', 'success');
        
        const unlockPrompt = document.getElementById('toolkitUnlockPrompt');
        const mainContent = document.getElementById('toolkitMainContent');
        
        if (unlockPrompt) unlockPrompt.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        
        renderThemes();
        renderProducts();
        
        if (unlockBtn) {
            unlockBtn.disabled = false;
            unlockBtn.innerHTML = '<i class="fas fa-unlock"></i> Unlock Now (25 Credits)';
        }
    }).catch((error) => {
        if (unlockBtn) {
            unlockBtn.disabled = false;
            unlockBtn.innerHTML = '<i class="fas fa-unlock"></i> Unlock Now (25 Credits)';
        }
        if (error.message === 'Insufficient credits') {
            showInsufficientCredits(25);
        } else {
            showToast(error.message, 'error');
        }
    });
}

function showProtectedAccess() {
    const loadingOverlay = document.getElementById('toolkitLoadingOverlay');
    const mainContent = document.getElementById('toolkitMainContent');
    const unlockPrompt = document.getElementById('toolkitUnlockPrompt');
    const protectedAccess = document.getElementById('protectedAccess');
    
    if (loadingOverlay) loadingOverlay.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
    if (unlockPrompt) unlockPrompt.style.display = 'none';
    if (protectedAccess) protectedAccess.style.display = 'flex';
}

// =========================
// THEMES & PRODUCTS
// =========================

function renderThemes() {
    const themesGrid = document.getElementById('themesGrid');
    if (!themesGrid) return;
    
    themesGrid.innerHTML = themes.map(theme => `
        <div class="theme-card ${theme.id === selectedTheme ? 'selected' : ''}" 
             onclick="selectTheme('${theme.id}')">
            <div class="theme-preview-box" style="background: ${theme.bg}; border: 2px solid ${theme.accent};"></div>
            <h4 style="color: ${theme.textColor};">${theme.name}</h4>
            <div class="theme-check"><i class="fas fa-check-circle"></i></div>
        </div>
    `).join('');
}

function selectTheme(themeId) {
    selectedTheme = themeId;
    renderThemes();
    showToast('Theme selected: ' + themeId, 'info');
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImageData = e.target.result;
            showProfilePreview(profileImageData);
        };
        reader.readAsDataURL(file);
    }
}

function previewImageUrl() {
    const url = document.getElementById('profileImageUrl').value.trim();
    if (url) {
        profileImageData = url;
        showProfilePreview(url);
    }
}

function showProfilePreview(src) {
    const preview = document.getElementById('profilePreview');
    const img = document.getElementById('profilePreviewImg');
    if (preview && img) {
        img.src = src;
        preview.style.display = 'block';
    }
}

function showProductForm() {
    const form = document.getElementById('productForm');
    if (form) {
        form.style.display = 'flex';
        const nameInput = document.getElementById('productName');
        if (nameInput) nameInput.focus();
    }
    editingProductIndex = -1;
    document.getElementById('productName').value = '';
    document.getElementById('productLink').value = '';
    document.getElementById('productAbout').value = '';
    document.getElementById('productType').value = 'free';
}

function hideProductForm() {
    const form = document.getElementById('productForm');
    if (form) form.style.display = 'none';
}

function saveProduct() {
    const name = document.getElementById('productName').value.trim();
    const link = document.getElementById('productLink').value.trim();
    const about = document.getElementById('productAbout').value.trim();
    const type = document.getElementById('productType').value;
    
    if (!name) {
        showToast('Please enter product name', 'error');
        return;
    }
    if (!link) {
        showToast('Please enter product link', 'error');
        return;
    }
    
    if (editingProductIndex >= 0) {
        products[editingProductIndex] = { name, link, about, type };
        showToast('Product updated successfully', 'success');
    } else {
        products.push({ name, link, about, type });
        showToast('Product added successfully', 'success');
    }
    
    hideProductForm();
    renderProducts();
}

function renderProducts() {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;
    
    if (products.length === 0) {
        productsList.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #B8B8C8; font-size: 13px;">
                <i class="fas fa-plus-circle" style="font-size: 24px; color: #6D5CFF; margin-bottom: 8px; display: block;"></i>
                No products added yet. Click "Add Product" to start building your toolkit.
            </div>
        `;
        return;
    }
    
    productsList.innerHTML = products.map((product, index) => `
        <div class="product-item">
            <div class="product-item-info">
                <span class="product-item-name">${escapeHtml(product.name)}</span>
                <span class="product-item-type ${product.type}">${product.type.toUpperCase()}</span>
            </div>
            <div class="product-item-actions">
                <button class="product-action-btn edit-action" onclick="editProduct(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="product-action-btn delete-action" onclick="deleteProduct(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function editProduct(index) {
    const product = products[index];
    editingProductIndex = index;
    document.getElementById('productName').value = product.name;
    document.getElementById('productLink').value = product.link;
    document.getElementById('productAbout').value = product.about || '';
    document.getElementById('productType').value = product.type || 'free';
    
    const form = document.getElementById('productForm');
    if (form) {
        form.style.display = 'flex';
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteProduct(index) {
    if (confirm('Delete this product?')) {
        products.splice(index, 1);
        renderProducts();
        showToast('Product deleted', 'info');
    }
}

// =========================
// CODE GENERATOR
// =========================

function generateToolkit() {
    if (isGenerating) return;
    
    const toolkitName = document.getElementById('toolkitName').value.trim();
    if (!toolkitName) {
        showToast('Please enter toolkit name', 'error');
        return;
    }
    
    if (products.length === 0) {
        showToast('Please add at least one product', 'error');
        return;
    }
    
    isGenerating = true;
    
    const progressDiv = document.getElementById('generationProgress');
    if (progressDiv) progressDiv.style.display = 'block';
    
    const steps = [
        'Preparing your toolkit...',
        'Creating your selected theme...',
        'Adding your products...',
        'Setting up contact information...',
        'Optimizing your website...',
        'Finalizing your toolkit...'
    ];
    
    const progressSteps = document.getElementById('progressSteps');
    if (progressSteps) {
        progressSteps.innerHTML = steps.map(step => `
            <div class="progress-step">
                <i class="fas fa-spinner fa-spin"></i>
                <span>${step}</span>
            </div>
        `).join('');
    }
    
    let stepIndex = 0;
    const interval = setInterval(() => {
        const stepsElements = document.querySelectorAll('.progress-step');
        if (stepIndex > 0 && stepsElements[stepIndex - 1]) {
            stepsElements[stepIndex - 1].classList.remove('active');
            stepsElements[stepIndex - 1].classList.add('complete');
            stepsElements[stepIndex - 1].querySelector('i').className = 'fas fa-check-circle';
        }
        if (stepIndex < stepsElements.length && stepsElements[stepIndex]) {
            stepsElements[stepIndex].classList.add('active');
            stepIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                const code = buildToolkitCode();
                showGeneratedCode(code);
                isGenerating = false;
                showToast('Toolkit generated successfully!', 'success');
            }, 300);
        }
    }, 400);
}

function buildToolkitCode() {
    const toolkitName = document.getElementById('toolkitName').value.trim() || 'My Premium Toolkit';
    const toolkitAbout = document.getElementById('toolkitAbout').value.trim();
    const whatsapp = document.getElementById('whatsappNumber').value.trim();
    const telegram = document.getElementById('telegramUsername').value.trim();
    const youtube = document.getElementById('youtubeLink').value.trim();
    const popupToggle = document.getElementById('popupToggle');
    const popupEnabled = popupToggle ? popupToggle.checked : false;
    
    const theme = themes.find(t => t.id === selectedTheme) || themes[3];
    const profileImg = profileImageData || 'https://raw.githubusercontent.com/Devile146/Demols/main/Fahad.jpg';
    
    const productsHTML = products.map((product) => {
        const isFree = product.type === 'free';
        const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');
        
        let buttonAction = `window.open('${escapeJsString(product.link)}', '_blank')`;
        if (!isFree && cleanWhatsapp) {
            buttonAction = `window.open('https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello! I am interested in purchasing: ' + product.name)}', '_blank')`;
        }
        
        const descriptionHTML = product.about ? 
            `<p style="color: ${theme.textColor}; opacity: 0.8; font-size: 13px; line-height: 1.5; margin: 10px 0 20px;">${escapeHtml(product.about)}</p>` : '';
        
        return `
        <div class="tool-card" style="background: ${theme.cardBg}; border: 1px solid ${theme.accent}33; border-radius: 16px; padding: 24px; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <span class="badge" style="display: inline-block; background: ${isFree ? 'rgba(74,222,128,0.15)' : 'rgba(255,215,0,0.15)'}; color: ${isFree ? '#4ade80' : '#ffd700'}; padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase;">${isFree ? 'FREE' : 'PREMIUM'}</span>
                <h3 style="color: ${theme.textColor}; font-size: 18px; font-weight: 700; margin: 14px 0 6px;">${escapeHtml(product.name)}</h3>
                ${descriptionHTML}
            </div>
            <button onclick="${buttonAction}" style="background: ${isFree ? theme.accent : '#ffd700'}; color: #000000; border: none; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: transform 0.2s ease; width: 100%; margin-top: 15px;">
                ${isFree ? 'Visit Tool' : 'Purchase Now'}
            </button>
        </div>`;
    }).join('\n');
    
    const contactButtons = [];
    if (whatsapp) {
        const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
        contactButtons.push(`<a href="https://wa.me/${cleanNumber}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:rgba(74,222,128,0.15);color:#4ade80;font-size:22px;text-decoration:none;"><i class="fab fa-whatsapp"></i></a>`);
    }
    if (telegram) {
        const cleanTelegram = telegram.replace('@', '');
        contactButtons.push(`<a href="https://t.me/${cleanTelegram}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:rgba(59,130,246,0.15);color:#3B82F6;font-size:22px;text-decoration:none;"><i class="fab fa-telegram"></i></a>`);
    }
    if (youtube) {
        contactButtons.push(`<a href="${youtube}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:rgba(255,77,145,0.15);color:#FF4D91;font-size:22px;text-decoration:none;"><i class="fab fa-youtube"></i></a>`);
    }
    
    const contactHTML = contactButtons.length > 0 ? `
    <div class="contact-section" style="text-align:center;margin-top:50px;padding:30px 20px;background:${theme.cardBg};border-radius:16px;border:1px solid ${theme.accent}20;">
        <h3 style="color: ${theme.textColor}; font-size:20px; margin-bottom:15px; font-weight: 700;">Get In Touch</h3>
        <div style="display:flex;gap:15px;justify-content:center;flex-wrap:wrap;">${contactButtons.join('')}</div>
    </div>` : '';
    
    const popupHTML = popupEnabled && contactButtons.length > 0 ? `
    <div id="welcomePopup" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;">
        <div style="background:${theme.bg};border:1px solid ${theme.accent};border-radius:20px;padding:35px;text-align:center;max-width:400px;width:100%;box-shadow:0 25px 50px rgba(0,0,0,0.5);">
            <h3 style="color:${theme.textColor};margin-bottom:10px;font-size:22px;">Welcome to ${escapeHtml(toolkitName)}!</h3>
            <p style="color:${theme.textColor};opacity:0.8;margin-bottom:20px;font-size:14px;">Connect with us on our official channels:</p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:25px;">${contactButtons.join('')}</div>
            <button onclick="document.getElementById('welcomePopup').style.display='none'" style="background:${theme.accent};color:#000;border:none;padding:10px 28px;border-radius:8px;font-weight:700;cursor:pointer;">Enter Website</button>
        </div>
    </div>` : '';
    
    const aboutHTML = toolkitAbout ? `
        <div class="about-section" style="text-align:center;max-width:650px;margin:15px auto 30px;">
            <p style="color:${theme.textColor};opacity:0.85;font-size:15px;line-height:1.6;">${escapeHtml(toolkitAbout)}</p>
        </div>` : '';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(toolkitName)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Orbitron:wght@600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: ${theme.font};
            background: ${theme.bg};
            color: ${theme.textColor};
            min-height: 100vh;
            padding: 20px 15px;
        }
        .container {
            max-width: 1100px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            padding: 40px 15px 20px;
        }
        .profile-img {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid ${theme.accent};
            box-shadow: 0 0 25px ${theme.accent}55;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 10px;
        }
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .tool-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }
        footer {
            text-align: center;
            padding: 40px 15px 20px;
            font-size: 0.85rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    ${popupHTML}
    <div class="container">
        <header class="header">
            <img src="${profileImg}" alt="Profile" class="profile-img" onerror="this.style.display='none'">
            <h1>${escapeHtml(toolkitName)}</h1>
            ${aboutHTML}
        </header>
        <main class="tools-grid">
            ${productsHTML}
        </main>
        ${contactHTML}
        <footer>
            &copy; ${new Date().getFullYear()} ${escapeHtml(toolkitName)}. All Rights Reserved.
        </footer>
    </div>
</body>
</html>`;
}

function showGeneratedCode(code) {
    const progress = document.getElementById('generationProgress');
    const output = document.getElementById('generatedOutput');
    const codeBox = document.getElementById('generatedCode');
    
    if (progress) progress.style.display = 'none';
    if (output) output.style.display = 'block';
    if (codeBox) codeBox.value = code;
    if (output) output.scrollIntoView({ behavior: 'smooth' });
}

function runToolkit() {
    const code = document.getElementById('generatedCode').value;
    const previewModal = document.getElementById('previewModal');
    const previewFrame = document.getElementById('previewFrame');
    
    if (previewModal && previewFrame) {
        previewModal.style.display = 'flex';
        previewFrame.srcdoc = code;
    }
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    if (modal) modal.style.display = 'none';
}

function copyCode() {
    const codeBox = document.getElementById('generatedCode');
    if (!codeBox) return;
    
    codeBox.select();
    navigator.clipboard.writeText(codeBox.value).then(() => {
        showToast('Code copied successfully!', 'success');
    }).catch(() => {
        document.execCommand('copy');
        showToast('Code copied successfully!', 'success');
    });
}

function downloadCode() {
    const code = document.getElementById('generatedCode').value;
    const toolkitName = document.getElementById('toolkitName').value.trim() || 'toolkit';
    const filename = toolkitName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.html';
    
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Toolkit downloaded successfully!', 'success');
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

function escapeJsString(str) {
    if (!str) return '';
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}
