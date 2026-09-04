// =========================================================
// TOOLKIT MAKER - COMPLETE SCRIPT (5 CREDITS / THEME & 2x2 GRID)
// =========================================================

const themes = [
    {
        id: 'emerald_ocean',
        name: 'Green & Blue Aurora',
        cost: 5,
        bg: 'linear-gradient(135deg, #061e24 0%, #032b17 50%, #0a1128 100%)',
        accent: '#10B981',
        secondaryAccent: '#06B6D4',
        cardBg: 'rgba(6, 30, 36, 0.75)',
        textColor: '#E6FFFA',
        font: 'Inter, sans-serif',
        btnGradient: 'linear-gradient(135deg, #10B981, #06B6D4)',
        btnColor: '#000000',
        catActiveBg: 'linear-gradient(135deg, #10B981, #06B6D4)',
        catActiveColor: '#000000',
        cardBorder: 'rgba(16, 185, 129, 0.35)',
        pillStyle: 'border-radius: 20px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);'
    },
    {
        id: 'premium_white',
        name: 'Premium White Luxury',
        cost: 5,
        bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        accent: '#2563EB',
        secondaryAccent: '#38BDF8',
        cardBg: 'rgba(255, 255, 255, 0.92)',
        textColor: '#0F172A',
        font: 'Inter, sans-serif',
        btnGradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
        btnColor: '#ffffff',
        catActiveBg: '#2563EB',
        catActiveColor: '#ffffff',
        cardBorder: 'rgba(203, 213, 225, 0.8)',
        pillStyle: 'border-radius: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.06);'
    },
    {
        id: 'sunset_vibrant',
        name: 'Colorful Sunset Cyber',
        cost: 5,
        bg: 'linear-gradient(135deg, #1f0d3d 0%, #3b0764 50%, #180324 100%)',
        accent: '#F43F5E',
        secondaryAccent: '#FB923C',
        cardBg: 'rgba(45, 15, 75, 0.75)',
        textColor: '#FFF1F2',
        font: 'Inter, sans-serif',
        btnGradient: 'linear-gradient(135deg, #F43F5E, #FB923C)',
        btnColor: '#ffffff',
        catActiveBg: 'linear-gradient(135deg, #F43F5E, #FB923C)',
        catActiveColor: '#ffffff',
        cardBorder: 'rgba(244, 63, 94, 0.35)',
        pillStyle: 'border-radius: 12px; transform: scale(1.02); box-shadow: 0 4px 15px rgba(244,63,94,0.3);'
    },
    {
        id: 'glass',
        name: 'Glassmorphism Royale',
        cost: 5,
        bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #090d16 100%)',
        accent: '#6D5CFF',
        secondaryAccent: '#A855F7',
        cardBg: 'rgba(255, 255, 255, 0.07)',
        textColor: '#F8FAFC',
        font: 'Inter, sans-serif',
        btnGradient: 'linear-gradient(135deg, #6D5CFF, #A855F7)',
        btnColor: '#ffffff',
        catActiveBg: 'linear-gradient(135deg, #6D5CFF, #A855F7)',
        catActiveColor: '#ffffff',
        cardBorder: 'rgba(109, 92, 255, 0.3)',
        pillStyle: 'border-radius: 30px; backdrop-filter: blur(10px);'
    },
    {
        id: 'matrix_hacker',
        name: 'Matrix Cyber Green',
        cost: 5,
        bg: 'linear-gradient(135deg, #020d04 0%, #001f08 50%, #000000 100%)',
        accent: '#00FF66',
        secondaryAccent: '#10B981',
        cardBg: 'rgba(0, 25, 8, 0.85)',
        textColor: '#00FF66',
        font: 'monospace',
        btnGradient: 'linear-gradient(135deg, #00FF66, #059669)',
        btnColor: '#000000',
        catActiveBg: '#00FF66',
        catActiveColor: '#000000',
        cardBorder: 'rgba(0, 255, 102, 0.4)',
        pillStyle: 'border-radius: 4px; font-family: monospace; border: 1px solid #00FF66;'
    },
    {
        id: 'gold_royale',
        name: 'Obsidian Gold Royale',
        cost: 5,
        bg: 'linear-gradient(135deg, #0a0a0c 0%, #1c1917 50%, #050505 100%)',
        accent: '#F59E0B',
        secondaryAccent: '#FCD34D',
        cardBg: 'rgba(28, 25, 23, 0.85)',
        textColor: '#FEF3C7',
        font: 'Inter, sans-serif',
        btnGradient: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
        btnColor: '#000000',
        catActiveBg: 'linear-gradient(135deg, #F59E0B, #D97706)',
        catActiveColor: '#000000',
        cardBorder: 'rgba(245, 158, 11, 0.35)',
        pillStyle: 'border-radius: 10px; box-shadow: 0 0 10px rgba(245,158,11,0.25);'
    },
    {
        id: 'neon_cyber',
        name: 'Neon Cyan & Magenta',
        cost: 5,
        bg: 'linear-gradient(135deg, #080214 0%, #15002a 50%, #020008 100%)',
        accent: '#06B6D4',
        secondaryAccent: '#EC4899',
        cardBg: 'rgba(21, 0, 42, 0.85)',
        textColor: '#FDF2F8',
        font: 'Orbitron, sans-serif',
        btnGradient: 'linear-gradient(135deg, #06B6D4, #EC4899)',
        btnColor: '#ffffff',
        catActiveBg: 'linear-gradient(135deg, #06B6D4, #EC4899)',
        catActiveColor: '#ffffff',
        cardBorder: 'rgba(6, 182, 212, 0.4)',
        pillStyle: 'border-radius: 18px; box-shadow: 0 0 12px rgba(6,182,212,0.4);'
    },
    {
        id: 'crimson_dark',
        name: 'Crimson Blood Red',
        cost: 5,
        bg: 'linear-gradient(135deg, #1c0307 0%, #2b050b 50%, #0d0103 100%)',
        accent: '#EF4444',
        secondaryAccent: '#F87171',
        cardBg: 'rgba(43, 5, 11, 0.85)',
        textColor: '#FEE2E2',
        font: 'Inter, sans-serif',
        btnGradient: 'linear-gradient(135deg, #EF4444, #B91C1C)',
        btnColor: '#ffffff',
        catActiveBg: '#EF4444',
        catActiveColor: '#ffffff',
        cardBorder: 'rgba(239, 68, 68, 0.35)',
        pillStyle: 'border-radius: 8px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);'
    }
];

let products = [];
let selectedTheme = 'emerald_ocean';
let profileImageData = null;
let editingProductIndex = -1;
let isGenerating = false;

document.addEventListener('DOMContentLoaded', function() {
    renderThemes();
    initProductForm();
});

function initProductForm() {
    const productForm = document.getElementById('productForm');
    if (productForm) productForm.style.display = 'none';
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
    
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        currentUserData = doc.exists ? doc.data() : { credits: 0, accountStatus: 'active' };
        currentUserData.credits = typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
        updateUserUI(user, currentUserData);
        
        if (currentUserData.accountStatus === 'disabled') {
            if (mainContent) mainContent.style.display = 'none';
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
        
        // Show main creator
        if (protectedAccess) protectedAccess.style.display = 'none';
        if (unlockPrompt) unlockPrompt.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        renderThemes();
        renderProducts();
    }).catch(err => {
        console.error("Error loading toolkit user:", err);
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    });
}

function renderThemes() {
    const themesGrid = document.getElementById('themesGrid');
    if (!themesGrid) return;
    
    themesGrid.innerHTML = themes.map(theme => `
        <div class="theme-card ${theme.id === selectedTheme ? 'selected' : ''}" onclick="selectTheme('${theme.id}')">
            <div class="theme-preview-box" style="background: ${theme.bg}; border: 2px solid ${theme.accent};">
                <span class="theme-cost-badge"><i class="fas fa-coins"></i> 5 Credits</span>
            </div>
            <h4 style="color: ${theme.textColor || '#fff'}; font-size: 13px; font-weight: 700; margin-top: 8px;">${theme.name}</h4>
            <div class="theme-check"><i class="fas fa-check-circle"></i></div>
        </div>
    `).join('');
}

function selectTheme(themeId) {
    selectedTheme = themeId;
    renderThemes();
    const found = themes.find(t => t.id === themeId);
    showToast(`Selected Style: ${found ? found.name : themeId} (5 Credits to build)`, 'info');
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
        document.getElementById('productName').focus();
    }
    editingProductIndex = -1;
    document.getElementById('productName').value = '';
    document.getElementById('productLink').value = '';
    document.getElementById('productAbout').value = '';
    document.getElementById('productType').value = 'free';
    if (document.getElementById('productCategory')) {
        document.getElementById('productCategory').value = 'General Tools';
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
    const category = catInput ? catInput.value.trim() : 'General Tools';
    
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
                No products added yet. Click "Add Product" to start building your 2x2 grid toolkit.
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
        document.getElementById('productCategory').value = product.category || 'General Tools';
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

// GENERATE TOOLKIT (DEDUCTS 5 CREDITS FOR THE THEME STYLE)
function generateToolkit() {
    if (isGenerating) return;
    
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    const userCredits = currentUserData && typeof currentUserData.credits === 'number' ? currentUserData.credits : 0;
    if (userCredits < 5) {
        showInsufficientCredits(5);
        return;
    }
    
    const toolkitName = document.getElementById('toolkitName').value.trim();
    if (!toolkitName) {
        showToast('Please enter toolkit name', 'error');
        return;
    }
    
    if (products.length === 0) {
        showToast('Please add at least one product', 'error');
        return;
    }
    
    if (!confirm(`Apply this premium style and build 2x2 grid toolkit for 5 Credits?`)) {
        return;
    }
    
    isGenerating = true;
    
    // Deduct 5 Credits for Theme Creation
    deductCredits(5, 'toolkit_style_build', `Generated Toolkit Style: ${selectedTheme}`).then(() => {
        const progressDiv = document.getElementById('generationProgress');
        if (progressDiv) progressDiv.style.display = 'block';
        
        const steps = [
            'Deducted 5 Credits for Premium Style...',
            'Building 2x2 Responsive Square Grid...',
            'Compiling Live Search & Dynamic Categories...',
            'Applying Custom Theme Color Gradients...',
            'Finalizing your Website Code...'
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
                    showToast('🎉 2x2 Grid Toolkit created! 5 Credits deducted.', 'success');
                }, 300);
            }
        }, 300);
    }).catch(err => {
        isGenerating = false;
        if (err.message === 'Insufficient credits') {
            showInsufficientCredits(5);
        } else {
            showToast(err.message, 'error');
        }
    });
}

// BUILD 2x2 GRID TOOLKIT WITH CATEGORY FILTER BUTTONS & LIVE SEARCH
function buildToolkitCode() {
    const toolkitName = document.getElementById('toolkitName').value.trim() || 'My Premium Toolkit';
    const toolkitAbout = document.getElementById('toolkitAbout').value.trim();
    const whatsapp = document.getElementById('whatsappNumber').value.trim();
    const telegram = document.getElementById('telegramUsername').value.trim();
    const youtube = document.getElementById('youtubeLink').value.trim();
    const popupToggle = document.getElementById('popupToggle');
    const popupEnabled = popupToggle ? popupToggle.checked : false;
    
    const theme = themes.find(t => t.id === selectedTheme) || themes[0];
    const profileImg = profileImageData || 'https://raw.githubusercontent.com/Devile146/Website/main/Dppic.jpg';
    
    // Auto Extract Unique Categories for Category Pills
    const categoriesSet = new Set(['All']);
    products.forEach(p => {
        if (p.category) categoriesSet.add(p.category);
        else if (p.type === 'premium') categoriesSet.add('Premium');
        else categoriesSet.add('Free');
    });
    const categoriesList = Array.from(categoriesSet);

    // Build Category Filter Buttons HTML with Theme Specific Look
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
            padding: 25px 10px 15px;
        }
        .profile-img {
            width: 85px;
            height: 85px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid ${theme.accent};
            box-shadow: 0 0 20px ${theme.accent}55;
            margin-bottom: 10px;
        }
        h1 {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 6px;
        }
        .about-section {
            max-width: 600px;
            margin: 6px auto 14px;
            font-size: 13px;
            opacity: 0.85;
            line-height: 1.5;
        }

        /* LIVE SEARCH BAR */
        .search-container {
            position: relative;
            max-width: 500px;
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
            border: 1px solid ${theme.cardBorder};
            border-radius: 25px;
            color: ${theme.textColor};
            font-size: 12px;
            outline: none;
            backdrop-filter: blur(10px);
        }
        .search-input:focus {
            border-color: ${theme.accent};
            box-shadow: 0 0 12px ${theme.accent}40;
        }

        /* CATEGORIES POPUP BAR */
        .categories-bar {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding: 4px 2px 10px;
            margin-bottom: 18px;
            justify-content: flex-start;
            scrollbar-width: none;
        }
        .categories-bar::-webkit-scrollbar { display: none; }
        .cat-pill {
            background: ${theme.cardBg};
            border: 1px solid ${theme.cardBorder};
            color: ${theme.textColor};
            padding: 6px 14px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.25s ease;
            ${theme.pillStyle}
        }
        .cat-pill.active, .cat-pill:hover {
            background: ${theme.catActiveBg};
            color: ${theme.catActiveColor};
            border-color: ${theme.accent};
            transform: translateY(-2px);
        }

        /* 2 BY 2 SQUARE GRID (STRICT 2 COLUMNS ON MOBILE & PC) */
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px;
        }
        @media (min-width: 768px) {
            .tools-grid {
                gap: 16px;
            }
        }
        .tool-card {
            background: ${theme.cardBg};
            border: 1px solid ${theme.cardBorder};
            border-radius: 14px;
            padding: 14px 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 140px;
            transition: all 0.25s ease;
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
            margin-bottom: 5px;
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
            margin-top: 6px;
        }
        .btn-free { background: ${theme.btnGradient}; color: ${theme.btnColor}; }
        .btn-prem { background: linear-gradient(135deg, #ffd700, #f59e0b); color: #000; }
        .tool-btn:hover { opacity: 0.92; transform: scale(0.98); }

        /* CONTACT & FOOTER */
        .contact-section {
            text-align: center;
            margin-top: 35px;
            padding: 20px 15px;
            background: ${theme.cardBg};
            border-radius: 14px;
            border: 1px solid ${theme.cardBorder};
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
            background: ${theme.btnGradient}; color: ${theme.btnColor}; border: none; padding: 8px 22px;
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
