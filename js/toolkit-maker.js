// =========================================================
// TOOLKIT MAKER - SCRIPT (2x2 GRID, SEARCH & CATEGORIES)
// =========================================================

const themes = [
    { id: 'hacker', name: 'Hacker Type', bg: 'linear-gradient(135deg, #0a0a0a, #001a00)', accent: '#00ff00', cardBg: 'rgba(0, 20, 0, 0.85)', textColor: '#00ff00', font: 'monospace' },
    { id: 'clean', name: 'Clean UI', bg: 'linear-gradient(135deg, #f5f5f5, #ffffff)', accent: '#3B82F6', cardBg: 'rgba(255, 255, 255, 0.95)', textColor: '#1a1a1a', font: 'Inter, sans-serif' },
    { id: 'neon', name: 'Neon Cyber', bg: 'linear-gradient(135deg, #0a0a2e, #1a0030)', accent: '#ff00ff', cardBg: 'rgba(20, 0, 40, 0.85)', textColor: '#00ffff', font: 'Orbitron, sans-serif' },
    { id: 'glass', name: 'Glassmorphism', bg: 'linear-gradient(135deg, #1a1a2e, #16213e)', accent: '#6D5CFF', cardBg: 'rgba(255, 255, 255, 0.08)', textColor: '#F5F5FF', font: 'Inter, sans-serif' },
    { id: 'gradient', name: 'Modern Gradient', bg: 'linear-gradient(135deg, #667eea, #764ba2)', accent: '#ffd700', cardBg: 'rgba(255, 255, 255, 0.15)', textColor: '#ffffff', font: 'Inter, sans-serif' },
    { id: 'dark', name: 'Dark Premium', bg: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)', accent: '#ffd700', cardBg: 'rgba(30, 30, 30, 0.9)', textColor: '#ffffff', font: 'Inter, sans-serif' },
    { id: 'minimal', name: 'Minimal White', bg: '#ffffff', accent: '#333333', cardBg: '#f8f8f8', textColor: '#333333', font: 'Inter, sans-serif' },
    { id: 'futuristic', name: 'Futuristic Blue', bg: 'linear-gradient(135deg, #0a0a2e, #003366)', accent: '#00d4ff', cardBg: 'rgba(0, 40, 80, 0.85)', textColor: '#00d4ff', font: 'Orbitron, sans-serif' },
    { id: 'purple', name: 'Purple Galaxy', bg: 'linear-gradient(135deg, #1a0030, #0a0a2e)', accent: '#9b59b6', cardBg: 'rgba(30, 0, 50, 0.85)', textColor: '#d4a5ff', font: 'Inter, sans-serif' },
    { id: 'rgb', name: 'RGB Tech', bg: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)', accent: '#ffffff', cardBg: 'rgba(0, 0, 0, 0.8)', textColor: '#ffffff', font: 'Orbitron, sans-serif' },
    { id: 'elegant', name: 'Elegant Professional', bg: 'linear-gradient(135deg, #2c3e50, #3498db)', accent: '#ecf0f1', cardBg: 'rgba(255, 255, 255, 0.12)', textColor: '#ecf0f1', font: 'Georgia, serif' },
    { id: 'colorful', name: 'Colorful Modern', bg: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)', accent: '#ffffff', cardBg: 'rgba(255, 255, 255, 0.2)', textColor: '#ffffff', font: 'Inter, sans-serif' },
    { id: 'midnight', name: 'Midnight Tech', bg: 'linear-gradient(135deg, #0a0a1a, #1a1a3a)', accent: '#4169e1', cardBg: 'rgba(10, 10, 30, 0.85)', textColor: '#87ceeb', font: 'Inter, sans-serif' },
    { id: 'aurora', name: 'Aurora', bg: 'linear-gradient(135deg, #00b4db, #0083b0, #00b4db)', accent: '#ffd700', cardBg: 'rgba(0, 60, 80, 0.75)', textColor: '#ffffff', font: 'Inter, sans-serif' },
    { id: 'dashboard', name: 'Advanced Dashboard', bg: 'linear-gradient(135deg, #1a1a2e, #16213e)', accent: '#6D5CFF', cardBg: 'rgba(255, 255, 255, 0.08)', textColor: '#F5F5FF', font: 'Inter, sans-serif' }
];

let products = [];
let selectedTheme = 'glass';
let profileImageData = null;
let editingProductIndex = -1;
let isGenerating = false;

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
    
    // Check if user already unlocked toolkit in this session
    const isSessionUnlocked = sessionStorage.getItem('toolkit_unlocked_' + user.uid) === 'true';
    
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        
        currentUserData = doc.exists ? doc.data() : { credits: 0, accountStatus: 'active' };
        currentUserData.credits = typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
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
        
        if (isSessionUnlocked) {
            if (unlockPrompt) unlockPrompt.style.display = 'none';
            if (protectedAccess) protectedAccess.style.display = 'none';
            if (mainContent) mainContent.style.display = 'block';
            renderThemes();
            renderProducts();
        } else {
            if (protectedAccess) protectedAccess.style.display = 'none';
            if (mainContent) mainContent.style.display = 'none';
            if (unlockPrompt) {
                unlockPrompt.style.display = 'flex';
                const currentCredsEl = document.getElementById('unlockCurrentCredits');
                if (currentCredsEl) {
                    currentCredsEl.textContent = currentUserData.credits;
                }
            }
        }
    }).catch((err) => {
        console.error("Error loading user in toolkit:", err);
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    });
}

function payAndOpenToolkit() {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    const credits = currentUserData && typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
    
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
        sessionStorage.setItem('toolkit_unlocked_' + currentUser.uid, 'true');
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
    if (document.getElementById('productCategory')) {
        document.getElementById('productCategory').value = 'Tools';
    }
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
    const catInput = document.getElementById('productCategory');
    const category = catInput ? catInput.value.trim() : 'Tools';
    
    if (!name) {
        showToast('Please enter product name', 'error');
        return;
    }
    if (!link) {
        showToast('Please enter product link', 'error');
        return;
    }
    
    if (editingProductIndex >= 0) {
        products[editingProductIndex] = { name, link, about, type, category };
        showToast('Product updated successfully', 'success');
    } else {
        products.push({ name, link, about, type, category });
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
                <span class="product-item-type ${product.type}">${(product.category || product.type).toUpperCase()}</span>
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
    if (document.getElementById('productCategory')) {
        document.getElementById('productCategory').value = product.category || 'Tools';
    }
    
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
        'Preparing 2x2 Grid Layout...',
        'Creating Theme & UI Colors...',
        'Adding Live Search & Categories...',
        'Optimizing Responsive View...',
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
                showToast('2x2 Grid Toolkit generated successfully!', 'success');
            }, 300);
        }
    }, 350);
}

// =========================================================
// BUILD 2x2 GRID TOOLKIT WITH SEARCH & CATEGORIES
// =========================================================
function buildToolkitCode() {
    const toolkitName = document.getElementById('toolkitName').value.trim() || 'My Premium Toolkit';
    const toolkitAbout = document.getElementById('toolkitAbout').value.trim();
    const whatsapp = document.getElementById('whatsappNumber').value.trim();
    const telegram = document.getElementById('telegramUsername').value.trim();
    const youtube = document.getElementById('youtubeLink').value.trim();
    const popupToggle = document.getElementById('popupToggle');
    const popupEnabled = popupToggle ? popupToggle.checked : false;
    
    const theme = themes.find(t => t.id === selectedTheme) || themes[3];
    const profileImg = profileImageData || 'https://raw.githubusercontent.com/Devile146/Website/main/Dppic.jpg';
    
    // Extract Unique Categories for Category Filter Bar
    const categoriesSet = new Set(['All']);
    products.forEach(p => {
        if (p.category) categoriesSet.add(p.category);
        else if (p.type === 'premium') categoriesSet.add('Premium');
        else categoriesSet.add('Free');
    });
    const categoriesList = Array.from(categoriesSet);

    // Build Category Filter Buttons HTML
    const categoriesHTML = categoriesList.map((cat, idx) => `
        <button class="cat-pill ${idx === 0 ? 'active' : ''}" onclick="filterCategory('${escapeHtml(cat)}', this)">
            ${escapeHtml(cat)}
        </button>
    `).join('\n');

    // Build 2x2 Square Grid Products HTML
    const productsHTML = products.map((product) => {
        const isFree = product.type === 'free';
        const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');
        const itemCategory = product.category || (isFree ? 'Free' : 'Premium');
        
        let buttonAction = `window.open('${escapeJsString(product.link)}', '_blank')`;
        if (!isFree && cleanWhatsapp) {
            buttonAction = `window.open('https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello! I am interested in purchasing: ' + product.name)}', '_blank')`;
        }
        
        const descriptionHTML = product.about ? 
            `<p class="tool-desc">${escapeHtml(product.about)}</p>` : '';
        
        return `
        <div class="tool-card" data-name="${escapeHtml(product.name)}" data-category="${escapeHtml(itemCategory)}" data-type="${product.type}">
            <div class="card-top">
                <span class="badge ${isFree ? 'badge-free' : 'badge-prem'}">${isFree ? 'FREE' : 'PREMIUM'}</span>
                <span class="tool-cat-badge">${escapeHtml(itemCategory)}</span>
                <h3 class="tool-title">${escapeHtml(product.name)}</h3>
                ${descriptionHTML}
            </div>
            <button onclick="${buttonAction}" class="tool-btn ${isFree ? 'btn-free' : 'btn-prem'}">
                ${isFree ? 'Open Tool' : 'Purchase'} <i class="fas ${isFree ? 'fa-external-link-alt' : 'fa-crown'}"></i>
            </button>
        </div>`;
    }).join('\n');
    
    // Contact Section
    const contactButtons = [];
    if (whatsapp) {
        const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
        contactButtons.push(`<a href="https://wa.me/${cleanNumber}" target="_blank" class="contact-btn wa"><i class="fab fa-whatsapp"></i></a>`);
    }
    if (telegram) {
        const cleanTelegram = telegram.replace('@', '');
        contactButtons.push(`<a href="https://t.me/${cleanTelegram}" target="_blank" class="contact-btn tg"><i class="fab fa-telegram"></i></a>`);
    }
    if (youtube) {
        contactButtons.push(`<a href="${youtube}" target="_blank" class="contact-btn yt"><i class="fab fa-youtube"></i></a>`);
    }
    
    const contactHTML = contactButtons.length > 0 ? `
    <div class="contact-section">
        <h3>Get In Touch</h3>
        <div class="contact-links">${contactButtons.join('')}</div>
    </div>` : '';
    
    const popupHTML = popupEnabled && contactButtons.length > 0 ? `
    <div id="welcomePopup" class="popup-overlay">
        <div class="popup-box">
            <h3>Welcome to ${escapeHtml(toolkitName)}!</h3>
            <p>Connect with us on our official channels:</p>
            <div class="contact-links" style="margin-bottom:15px;">${contactButtons.join('')}</div>
            <button onclick="document.getElementById('welcomePopup').style.display='none'" class="popup-close-btn">Enter Site</button>
        </div>
    </div>` : '';
    
    const aboutHTML = toolkitAbout ? `
        <div class="about-section">
            <p>${escapeHtml(toolkitAbout)}</p>
        </div>` : '';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>${escapeHtml(toolkitName)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: ${theme.font};
            background: ${theme.bg};
            color: ${theme.textColor};
            min-height: 100vh;
            padding: 15px 10px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            padding: 30px 10px 15px;
        }
        .profile-img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid ${theme.accent};
            box-shadow: 0 0 20px ${theme.accent}55;
            margin-bottom: 12px;
        }
        h1 {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 6px;
        }
        .about-section {
            max-width: 600px;
            margin: 8px auto 15px;
            font-size: 13px;
            opacity: 0.85;
            line-height: 1.5;
        }

        /* SEARCH BAR */
        .search-container {
            position: relative;
            max-width: 480px;
            margin: 0 auto 15px;
        }
        .search-container i {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: ${theme.accent};
            font-size: 13px;
        }
        .search-input {
            width: 100%;
            padding: 10px 15px 10px 38px;
            background: ${theme.cardBg};
            border: 1px solid ${theme.accent}40;
            border-radius: 25px;
            color: ${theme.textColor};
            font-size: 12px;
            outline: none;
            backdrop-filter: blur(10px);
        }
        .search-input:focus {
            border-color: ${theme.accent};
            box-shadow: 0 0 10px ${theme.accent}33;
        }

        /* CATEGORIES BAR */
        .categories-bar {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 8px;
            margin-bottom: 20px;
            justify-content: flex-start;
            scrollbar-width: none;
        }
        .categories-bar::-webkit-scrollbar { display: none; }
        .cat-pill {
            background: ${theme.cardBg};
            border: 1px solid ${theme.accent}33;
            color: ${theme.textColor};
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
        }
        .cat-pill.active, .cat-pill:hover {
            background: ${theme.accent};
            color: #000;
            border-color: ${theme.accent};
        }

        /* 2 BY 2 SQUARE GRID (EXACT 2 COLUMNS ON ALL SCREENS) */
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        @media (min-width: 768px) {
            .tools-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
            }
        }
        .tool-card {
            background: ${theme.cardBg};
            border: 1px solid ${theme.accent}33;
            border-radius: 14px;
            padding: 14px 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 140px;
            transition: all 0.2s ease;
            backdrop-filter: blur(8px);
        }
        .tool-card:hover {
            transform: translateY(-3px);
            border-color: ${theme.accent};
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .card-top {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .badge {
            display: inline-block;
            font-size: 9px;
            font-weight: 800;
            padding: 2px 7px;
            border-radius: 4px;
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .badge-free { background: rgba(74,222,128,0.2); color: #4ade80; }
        .badge-prem { background: rgba(255,215,0,0.2); color: #ffd700; }
        
        .tool-cat-badge {
            font-size: 9px;
            opacity: 0.65;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        .tool-title {
            font-size: 13px;
            font-weight: 700;
            margin-bottom: 4px;
            line-height: 1.3;
            word-break: break-word;
        }
        .tool-desc {
            font-size: 10px;
            opacity: 0.75;
            line-height: 1.4;
            margin-bottom: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .tool-btn {
            width: 100%;
            padding: 8px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            transition: 0.2s;
            margin-top: 8px;
        }
        .btn-free { background: ${theme.accent}; color: #000; }
        .btn-prem { background: #ffd700; color: #000; }
        .tool-btn:hover { opacity: 0.9; transform: scale(0.98); }

        /* CONTACT & FOOTER */
        .contact-section {
            text-align: center;
            margin-top: 35px;
            padding: 20px 15px;
            background: ${theme.cardBg};
            border-radius: 14px;
            border: 1px solid ${theme.accent}20;
        }
        .contact-section h3 { font-size: 16px; margin-bottom: 12px; }
        .contact-links { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .contact-btn {
            width: 40px; height: 40px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 18px; text-decoration: none;
        }
        .contact-btn.wa { background: rgba(74,222,128,0.15); color: #4ade80; }
        .contact-btn.tg { background: rgba(59,130,246,0.15); color: #3B82F6; }
        .contact-btn.yt { background: rgba(255,77,145,0.15); color: #FF4D91; }

        footer {
            text-align: center;
            padding: 30px 10px 15px;
            font-size: 11px;
            opacity: 0.6;
        }

        /* POPUP */
        .popup-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center;
            z-index: 9999; padding: 15px;
        }
        .popup-box {
            background: ${theme.bg}; border: 1px solid ${theme.accent};
            border-radius: 16px; padding: 25px 20px; text-align: center; max-width: 340px; width: 100%;
        }
        .popup-box h3 { font-size: 18px; margin-bottom: 8px; }
        .popup-box p { font-size: 12px; opacity: 0.8; margin-bottom: 15px; }
        .popup-close-btn {
            background: ${theme.accent}; color: #000; border: none; padding: 8px 22px;
            border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;
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

        <!-- LIVE SEARCH BAR -->
        <div class="search-container">
            <i class="fas fa-search"></i>
            <input type="text" id="toolSearch" class="search-input" placeholder="Search in ${products.length} tools..." oninput="filterToolkitTools()">
        </div>

        <!-- CATEGORIES FILTER BAR -->
        <div class="categories-bar">
            ${categoriesHTML}
        </div>

        <!-- 2 BY 2 SQUARE GRID -->
        <main class="tools-grid" id="toolsGridBox">
            ${productsHTML}
        </main>
        
        <div id="noResults" style="display:none; text-align:center; padding:30px; font-size:12px; opacity:0.7;">
            No tools found matching your search.
        </div>

        ${contactHTML}
        <footer>
            &copy; ${new Date().getFullYear()} ${escapeHtml(toolkitName)}. All Rights Reserved.
        </footer>
    </div>

    <script>
        let currentCategory = 'All';
        
        function filterCategory(cat, btn) {
            currentCategory = cat;
            document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterToolkitTools();
        }
        
        function filterToolkitTools() {
            const query = (document.getElementById('toolSearch').value || '').toLowerCase().trim();
            const cards = document.querySelectorAll('.tool-card');
            let visibleCount = 0;
            
            cards.forEach(card => {
                const name = (card.dataset.name || '').toLowerCase();
                const category = card.dataset.category || '';
                const type = (card.dataset.type || '').toLowerCase();
                
                const matchesCategory = (currentCategory === 'All') || 
                                        (category.toLowerCase() === currentCategory.toLowerCase()) || 
                                        (type === currentCategory.toLowerCase());
                
                const matchesSearch = name.includes(query);
                
                if (matchesCategory && matchesSearch) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            const noRes = document.getElementById('noResults');
            if (noRes) {
                noRes.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }
    </script>
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
    return String(text).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);
}

function escapeJsString(str) {
    if (!str) return '';
    return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
            }
