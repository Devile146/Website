// =========================
// FAHAD TECH - MAIN SCRIPT
// =========================

// Configuration - Update these with your actual links
const CONFIG = {
    WHATSAPP_LINK: "https://wa.me/YOUR_NUMBER_HERE",
    TELEGRAM_LINK: "https://t.me/YOUR_USERNAME_HERE",
    YOUTUBE_LINK: "https://youtube.com/@YOUR_CHANNEL_HERE",
    WEBSITE_LINK: "https://yourwebsite.com",
    PROFILE_IMAGE: "https://raw.githubusercontent.com/Devile146/Website/main/Img2.jpg"
};

// Tools Data - Add your tools here
let toolsData = [
    {
        name: "Tool Coming Soon",
        description: "Placeholder for your first tool. Add your tools here.",
        category: "online-tools",
        icon: "fas fa-tools",
        link: "#"
    },
    {
        name: "App Coming Soon",
        description: "Placeholder for your first app. Add your apps here.",
        category: "apps",
        icon: "fas fa-mobile-alt",
        link: "#"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initContactLinks();
    initProfileImage();
    
    // Initialize tools page if we're on tools.html
    if (document.getElementById('toolsGrid')) {
        renderTools('all');
        initToolFilters();
    }
    
    // Check for category parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && document.getElementById('toolsGrid')) {
        renderTools(category);
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            }
        });
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
        
        // Close menu when clicking a link
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
    // WhatsApp
    document.querySelectorAll('#whatsappCard, #sidebarWhatsApp').forEach(el => {
        if (el) el.href = CONFIG.WHATSAPP_LINK;
    });
    
    // Telegram
    document.querySelectorAll('#telegramCard, #sidebarTelegram').forEach(el => {
        if (el) el.href = CONFIG.TELEGRAM_LINK;
    });
    
    // YouTube
    document.querySelectorAll('#youtubeCard, #sidebarYouTube').forEach(el => {
        if (el) el.href = CONFIG.YOUTUBE_LINK;
    });
    
    // Website
    document.querySelectorAll('#websiteCard').forEach(el => {
        if (el) el.href = CONFIG.WEBSITE_LINK;
    });
}

// Profile Image
function initProfileImage() {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        profileImg.src = CONFIG.PROFILE_IMAGE;
    }
}

// Render Tools
function renderTools(category = 'all') {
    const toolsGrid = document.getElementById('toolsGrid');
    const toolsEmpty = document.getElementById('toolsEmpty');
    
    if (!toolsGrid) return;
    
    // Filter tools
    let filteredTools = toolsData;
    if (category !== 'all') {
        filteredTools = toolsData.filter(tool => tool.category === category);
    }
    
    // Clear grid
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
    
    // Render each tool
    filteredTools.forEach((tool, index) => {
        const card = document.createElement('div');
        card.classList.add('tool-card');
        card.style.animationDelay = (index * 0.1) + 's';
        
        card.innerHTML = `
            <div class="tool-icon">
                <i class="${tool.icon}"></i>
            </div>
            <span class="tool-category-badge">${getCategoryName(tool.category)}</span>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" target="_blank" rel="noopener noreferrer" class="tool-btn">
                Open Tool <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        toolsGrid.appendChild(card);
    });
}

// Tool Filters
function initToolFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Render filtered tools
            renderTools(this.dataset.filter);
        });
    });
}

// Search Tools
function searchTools() {
    const searchInput = document.getElementById('toolSearchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        renderTools('all');
        return;
    }
    
    const filtered = toolsData.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        getCategoryName(tool.category).toLowerCase().includes(searchTerm)
    );
    
    const toolsGrid = document.getElementById('toolsGrid');
    const toolsEmpty = document.getElementById('toolsEmpty');
    
    if (!toolsGrid) return;
    
    toolsGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        toolsGrid.style.display = 'none';
        if (toolsEmpty) {
            toolsEmpty.style.display = 'block';
            toolsEmpty.innerHTML = `
                <i class="fas fa-search"></i>
                <p>No tools found for "${searchInput.value}"</p>
            `;
        }
        return;
    }
    
    toolsGrid.style.display = 'grid';
    if (toolsEmpty) {
        toolsEmpty.style.display = 'none';
    }
    
    filtered.forEach((tool, index) => {
        const card = document.createElement('div');
        card.classList.add('tool-card');
        card.style.animationDelay = (index * 0.1) + 's';
        
        card.innerHTML = `
            <div class="tool-icon">
                <i class="${tool.icon}"></i>
            </div>
            <span class="tool-category-badge">${getCategoryName(tool.category)}</span>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" target="_blank" rel="noopener noreferrer" class="tool-btn">
                Open Tool <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        toolsGrid.appendChild(card);
    });
}

// Get Category Name
function getCategoryName(category) {
    const names = {
        'online-tools': 'Online Tools',
        'apps': 'Apps & Resources',
        'tricks': 'Tricks & Tips',
        'all': 'All Tools'
    };
    return names[category] || category;
}

// Add Tool Function (for future use)
function addTool(tool) {
    toolsData.push(tool);
    renderTools('all');
}