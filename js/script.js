// =========================
// FAHAD TECH - MAIN SCRIPT
// =========================

// Configuration
const CONFIG = {
    WHATSAPP_LINK: "https://wa.me/923251138960",
    TELEGRAM_LINK: "https://t.me/fahad_tricks_bot",
    EMAIL_LINK: "mailto:fahadali2727@gmail.com",
    PREMIUM_WHATSAPP: "https://wa.me/923251138959",
    PROFILE_IMAGE: "https://raw.githubusercontent.com/Devile146/Website/main/Itsme.jpg"
};

// State
let currentUser = null;
let userCredits = 0;
let selectedPackage = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initContactLinks();
    initProfileImage();
    initBackgroundVideo();
    initAuthUI();
    
    if (document.getElementById('toolsGrid')) {
        renderTools('all');
        checkUrlCategory();
    }
    
    if (document.getElementById('pricingGrid')) {
        loadPricingPackages();
    }
    
    if (document.getElementById('pricingContainer')) {
        loadPricingPackages();
    }
});

// ============ BACKGROUND VIDEO ============
function initBackgroundVideo() {
    const video = document.getElementById('bgVideo');
    if (!video) return;
    
    video.addEventListener('timeupdate', function() {
        if (this.duration - this.currentTime < 0.5) {
            this.currentTime = 0;
            this.play();
        }
    });
    
    video.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }
}

// ============ CONTACT LINKS ============
function initContactLinks() {
    document.querySelectorAll('[data-whatsapp]').forEach(el => {
        el.href = CONFIG.WHATSAPP_LINK;
    });
    document.querySelectorAll('[data-telegram]').forEach(el => {
        el.href = CONFIG.TELEGRAM_LINK;
    });
    document.querySelectorAll('[data-email]').forEach(el => {
        el.href = CONFIG.EMAIL_LINK;
    });
}

// ============ PROFILE IMAGE ============
function initProfileImage() {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        profileImg.src = CONFIG.PROFILE_IMAGE;
    }
}

// ============ AUTH UI ============
function initAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const accountBtn = document.getElementById('accountBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileAccountBtn = document.getElementById('mobileAccountBtn');
    const sidebarAccountBtn = document.getElementById('sidebarAccountBtn');
    const navUserEmail = document.getElementById('navUserEmail');
    const navCredits = document.getElementById('navCredits');
    
    auth.onAuthStateChanged(function(user) {
        currentUser = user;
        
        if (user) {
            // Show account buttons, hide login
            if (loginBtn) loginBtn.style.display = 'none';
            if (accountBtn) accountBtn.style.display = 'flex';
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
            if (mobileAccountBtn) mobileAccountBtn.style.display = 'block';
            if (sidebarAccountBtn) sidebarAccountBtn.style.display = 'flex';
            
            if (navUserEmail) {
                navUserEmail.textContent = user.email ? user.email.split('@')[0] : 'Account';
            }
            
            // Load credits
            loadUserCredits(user.uid);
        } else {
            // Show login, hide account
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (accountBtn) accountBtn.style.display = 'none';
            if (mobileLoginBtn) mobileLoginBtn.style.display = 'block';
            if (mobileAccountBtn) mobileAccountBtn.style.display = 'none';
            if (sidebarAccountBtn) sidebarAccountBtn.style.display = 'none';
        }
    });
}

// ============ LOAD USER CREDITS ============
async function loadUserCredits(userId) {
    try {
        const doc = await usersCollection.doc(userId).get();
        if (doc.exists) {
            userCredits = doc.data().credits || 0;
            const navCredits = document.getElementById('navCredits');
            if (navCredits) {
                navCredits.textContent = userCredits;
            }
            document.querySelectorAll('.credit-display').forEach(el => {
                el.textContent = userCredits + ' Credits';
            });
            document.querySelectorAll('.credit-number').forEach(el => {
                el.textContent = userCredits;
            });
        }
    } catch (error) {
        console.error('Error loading credits:', error);
    }
}

// ============ CHECK URL CATEGORY ============
function checkUrlCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        filterTools(category);
    }
}

// ============ RENDER TOOLS ============
function renderTools(category = 'all', searchTerm = '') {
    const toolsGrid = document.getElementById('toolsGrid');
    const toolsEmpty = document.getElementById('toolsEmpty');
    
    if (!toolsGrid) return;
    
    let filteredTools = toolsData;
    
    if (category !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === category);
    }
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredTools = filteredTools.filter(tool => 
            tool.name.toLowerCase().includes(term) ||
            tool.description.toLowerCase().includes(term)
        );
    }
    
    toolsGrid.innerHTML = '';
    
    if (filteredTools.length === 0) {
        toolsGrid.style.display = 'none';
        if (toolsEmpty) {
            toolsEmpty.style.display = 'block';
        }
        return;
    }
    
    toolsGrid.style.display = 'grid';
    if (toolsEmpty) {
        toolsEmpty.style.display = 'none';
    }
    
    filteredTools.forEach((tool, index) => {
        const card = document.createElement('div');
        card.classList.add('tool-card');
        card.style.animationDelay = (index * 0.04) + 's';
        
        const isPremium = tool.type === 'premium';
        const buttonAction = isPremium 
            ? `window.open('${CONFIG.PREMIUM_WHATSAPP}?text=${encodeURIComponent('Hello! I am interested in: ' + tool.name)}', '_blank')`
            : `handleToolAccess('${tool.name.replace(/'/g, "\\'")}', '${tool.link}')`;
        
        const buttonText = isPremium ? 'Contact Admin' : 'Open Tool';
        const buttonIcon = isPremium ? 'fas fa-crown' : 'fas fa-external-link-alt';
        
        card.innerHTML = `
            <div class="tool-icon">
                <i class="${tool.icon}"></i>
            </div>
            <span class="tool-category-badge ${isPremium ? 'premium-badge' : ''}">${isPremium ? '⭐ PREMIUM' : getCategoryName(tool.category)}</span>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <button onclick="${buttonAction}" class="tool-btn ${isPremium ? 'premium-btn' : 'free-btn'}">
                ${buttonText} <i class="${buttonIcon}"></i>
            </button>
        `;
        
        toolsGrid.appendChild(card);
    });
}

// ============ HANDLE TOOL ACCESS ============
async function handleToolAccess(toolName, toolLink) {
    const user = auth.currentUser;
    
    if (!user) {
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'auth.html';
        return;
    }
    
    // Check account status
    const userData = await getCurrentUserData();
    if (!userData || userData.accountStatus !== 'active') {
        alert('Your account is currently inactive.');
        return;
    }
    
    // Check credits
    const credits = await checkCredits(user.uid);
    const TOOL_COST = 5;
    
    if (credits < TOOL_COST) {
        showPurchaseModal('You need ' + TOOL_COST + ' credits to access this tool. Current: ' + credits);
        return;
    }
    
    // Show confirmation
    const confirmed = await showCreditConfirmation(toolName, TOOL_COST, credits);
    if (!confirmed) return;
    
    // Deduct credits
    const result = await deductToolCredits(toolName, TOOL_COST);
    if (result.success) {
        window.open(toolLink, '_blank');
        loadUserCredits(user.uid);
    }
}

// ============ SHOW CREDIT CONFIRMATION ============
function showCreditConfirmation(toolName, cost, balance) {
    return new Promise((resolve) => {
        const modal = document.getElementById('creditConfirmModal');
        if (modal) {
            document.getElementById('confirmToolName').textContent = toolName;
            document.getElementById('confirmCost').textContent = cost + ' Credits';
            document.getElementById('confirmBalance').textContent = balance + ' Credits';
            modal.style.display = 'flex';
            
            document.getElementById('confirmYesBtn').onclick = function() {
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

// ============ FILTER TOOLS ============
function filterTools(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    const searchTerm = document.getElementById('toolSearchInput')?.value || '';
    renderTools(category, searchTerm);
}

// ============ SEARCH TOOLS ============
function searchTools() {
    const searchInput = document.getElementById('toolSearchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    renderTools(activeCategory, searchTerm);
}

// ============ GET CATEGORY NAME ============
function getCategoryName(category) {
    const names = {
        'ai': 'AI Tools',
        'photo': 'Photo AI',
        'video': 'Video Makers',
        'osint': 'OSINT',
        'telegram': 'Telegram Bots',
        'encoder': 'Encoders',
        'social': 'Social Media',
        'mods': 'Mod Apps',
        'hacking': 'Hacking',
        'prank': 'Prank',
        'courses': 'Courses',
        'gaming': 'Gaming',
        'fonts': 'Fonts',
        'utility': 'Utilities',
        'premium': 'Premium'
    };
    return names[category] || category;
}

// ============ SHOW PURCHASE MODAL ============
function showPurchaseModal(message) {
    const modal = document.getElementById('purchaseModal');
    if (!modal) return;
    
    document.getElementById('purchaseModalMsg').textContent = message || 'You need more credits to access this feature.';
    
    // Load mini packages
    loadMiniPackages();
    
    modal.style.display = 'flex';
}

function closePurchaseModal() {
    const modal = document.getElementById('purchaseModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

async function loadMiniPackages() {
    const container = document.getElementById('purchaseMiniPacks');
    if (!container) return;
    
    try {
        const snapshot = await packagesCollection.where('active', '==', true).limit(3).get();
        const packages = [];
        snapshot.forEach(doc => {
            packages.push({ id: doc.id, ...doc.data() });
        });
        
        container.innerHTML = packages.map(pkg => `
            <div class="purchase-mini-pack">
                <div class="pack-info">
                    <div class="pack-name">${pkg.credits} Credits</div>
                    <div class="pack-price">Rs. ${pkg.price}</div>
                </div>
                <button class="pack-btn" onclick="window.location.href='pricing.html'">Buy</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading packages:', error);
    }
}

// ============ VISIT MODAL ============
function openVisitModal(toolName, toolLink) {
    const modal = document.getElementById('visitModal');
    const modalToolName = document.getElementById('modalToolName');
    const visitLink = document.getElementById('visitLink');
    
    if (modal && modalToolName && visitLink) {
        modalToolName.textContent = toolName;
        visitLink.href = toolLink;
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('visitModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ============ CLOSE MODALS ON OUTSIDE CLICK ============
window.onclick = function(event) {
    const modals = document.querySelectorAll('.visit-modal, .purchase-modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.visit-modal, .purchase-modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});
