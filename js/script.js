// =========================
// FAHAD TECH - MAIN SCRIPT (FIXED)
// =========================

// Configuration
const CONFIG = {
    WHATSAPP_LINK: "https://wa.me/923251138960",
    TELEGRAM_LINK: "https://t.me/fahad_tricks_bot",
    EMAIL_LINK: "mailto:fahadali2727@gmail.com",
    PREMIUM_WHATSAPP: "https://wa.me/923251138959",
    PROFILE_IMAGE: "https://raw.githubusercontent.com/Devile146/Website/main/Dppic.jpg"
};

// Current state
let currentUser = null;
let currentUserData = null;
let isProcessingTool = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initContactLinks();
    initProfileImage();
    
    // Initialize tools if on tools page
    if (document.getElementById('toolsGrid')) {
        renderTools('all');
        checkUrlCategory();
    }
});

// =========================
// NAVBAR FUNCTIONS
// =========================

// Initialize mobile menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
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

// Initialize contact links
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

// Initialize profile image
function initProfileImage() {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        profileImg.src = CONFIG.PROFILE_IMAGE;
    }
}

// =========================
// URL CATEGORY CHECK
// =========================

function checkUrlCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        filterTools(category);
    }
}

// =========================
// RENDER TOOLS
// =========================

function renderTools(category = 'all', searchTerm = '') {
    const toolsGrid = document.getElementById('toolsGrid');
    const toolsEmpty = document.getElementById('toolsEmpty');
    
    if (!toolsGrid) return;
    
    let filteredTools = toolsData;
    
    // Filter by category
    if (category !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === category);
    }
    
    // Filter by search
    if (searchTerm) {
        filteredTools = filteredTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) ||
            tool.description.toLowerCase().includes(searchTerm)
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
        card.style.animationDelay = (index * 0.05) + 's';
        
        const isPremium = tool.type === 'premium';
        
        if (isPremium) {
            card.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <span class="tool-category-badge premium-badge">★ PREMIUM</span>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <button onclick="window.open('${CONFIG.PREMIUM_WHATSAPP}?text=${encodeURIComponent('Hello! I am interested in: ' + tool.name)}', '_blank')" class="tool-btn premium-btn">
                    Contact Admin <i class="fas fa-crown"></i>
                </button>
            `;
        } else {
            card.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <span class="tool-category-badge">${getCategoryName(tool.category)}</span>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <button onclick="checkToolAccess('${tool.name.replace(/'/g, "\\'")}', '${tool.link}')" class="tool-btn free-btn">
                    Open Tool (5 Credits) <i class="fas fa-external-link-alt"></i>
                </button>
            `;
        }
        
        toolsGrid.appendChild(card);
    });
}

// =========================
// FILTER TOOLS
// =========================

function filterTools(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    const searchTerm = document.getElementById('toolSearchInput')?.value || '';
    renderTools(category, searchTerm);
}

// =========================
// SEARCH TOOLS
// =========================

function searchTools() {
    const searchInput = document.getElementById('toolSearchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    renderTools(activeCategory, searchTerm);
}

// =========================
// GET CATEGORY NAME
// =========================

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

// =========================
// VISIT MODAL
// =========================

function openVisitModal(toolName, toolLink) {
    const modal = document.getElementById('visitModal');
    const modalToolName = document.getElementById('modalToolName');
    const visitLink = document.getElementById('visitLink');
    
    if (modal && modalToolName && visitLink) {
        modalToolName.textContent = toolName;
        visitLink.setAttribute('href', toolLink);
        visitLink.textContent = 'Visit Tool (5 Credits)';
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('visitModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// =========================
// EVENT LISTENERS
// =========================

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('visitModal');
    if (event.target === modal) {
        closeModal();
    }
    
    const authModal = document.getElementById('authModal');
    if (event.target === authModal) {
        closeAuthModal();
    }
    
    const insufficientModal = document.getElementById('insufficientModal');
    if (event.target === insufficientModal) {
        closeInsufficientModal();
    }
};

// Close modal on Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeAuthModal();
        closeInsufficientModal();
    }
});
