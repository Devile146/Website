// =========================
// FAHAD TECH - MAIN SCRIPT
// =========================

// Configuration
const CONFIG = {
    WHATSAPP_LINK: "https://wa.me/923251138960",
    TELEGRAM_LINK: "https://t.me/fahad_tricks_bot",
    EMAIL_LINK: "mailto:fahadali2727@gmail.com",
    PREMIUM_WHATSAPP: "https://wa.me/923251138959",
    PROFILE_IMAGE: "https://raw.githubusercontent.com/Devile146/Demols/main/Fahad.jpg"
};

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

// Mobile Menu
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

// Contact Links
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

// Profile Image
function initProfileImage() {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        profileImg.src = CONFIG.PROFILE_IMAGE;
    }
}

// Check URL Category
function checkUrlCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        filterTools(category);
    }
}

// Render Tools
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
        const buttonAction = isPremium 
            ? `window.open('${CONFIG.PREMIUM_WHATSAPP}?text=${encodeURIComponent('Hello! I am interested in: ' + tool.name)}', '_blank')`
            : `openVisitModal('${tool.name.replace(/'/g, "\\'")}', '${tool.link}')`;
        
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

// Filter Tools
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

// Search Tools
function searchTools() {
    const searchInput = document.getElementById('toolSearchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    renderTools(activeCategory, searchTerm);
}

// Get Category Name
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

// Visit Modal
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

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('visitModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Close modal on Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
