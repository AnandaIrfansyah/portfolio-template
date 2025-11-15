/* ==========================================
   GLOBAL JAVASCRIPT - Ananda Irfansyah Portfolio
   ========================================== */

// ==========================================
// COMMAND PALETTE FUNCTIONS
// ==========================================
function openCommandPalette() {
    const palette = document.getElementById('commandPalette');
    palette.classList.add('active');
    document.getElementById('commandSearchInput').focus();
    document.body.style.overflow = 'hidden';
}

function closeCommandPalette(event) {
    if (event && event.target.id !== 'commandPalette') return;
    const palette = document.getElementById('commandPalette');
    palette.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', function (e) {
    // Cmd/Ctrl + K to open command palette
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
    }
    // Escape to close command palette
    if (e.key === 'Escape') {
        closeCommandPalette(e);
    }
});

// ==========================================
// COMMAND PALETTE SEARCH
// ==========================================
document.getElementById('commandSearchInput')?.addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.command-item');
    const sections = document.querySelectorAll('.command-section');

    items.forEach(item => {
        const text = item.querySelector('.command-item-text').textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // Hide sections if all items are hidden
    sections.forEach(section => {
        const visibleItems = section.querySelectorAll('.command-item[style="display: flex;"]');
        if (visibleItems.length === 0 && query !== '') {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
        }
    });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');

    sidebar.classList.toggle('show');
    overlay.classList.toggle('active');

    if (sidebar.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ==========================================
// CLOSE MOBILE MENU ON NAV CLICK
// ==========================================
function closeMobileMenu(event) {
    if (window.innerWidth <= 991) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('show')) {
            toggleMobileMenu();
        }
    }
}

// ==========================================
// LANGUAGE TOGGLE (Simplified - Placeholder for Laravel)
// ==========================================
function toggleLanguage() {
    const currentLang = document.getElementById('currentLang');
    if (currentLang) {
        const newLang = currentLang.textContent === 'EN' ? 'ID' : 'EN';
        currentLang.textContent = newLang;
        
        // Add smooth transition effect
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
        
        // Placeholder - nanti implementasi Laravel Localization
        console.log('Language switched to:', newLang);
    }
}

// ==========================================
// BACK TO TOP FUNCTIONALITY
// ==========================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton?.classList.add('show');
    } else {
        backToTopButton?.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !this.classList.contains('tab-item')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ==========================================
// PROJECT SEARCH FUNCTIONALITY (Projects Page)
// ==========================================
const projectSearchInput = document.getElementById('projectSearchInput');
if (projectSearchInput) {
    projectSearchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.project-desc')?.textContent.toLowerCase() || '';
            
            if (title.includes(query) || desc.includes(query)) {
                card.parentElement.style.display = 'block';
            } else {
                card.parentElement.style.display = 'none';
            }
        });
    });
}

// ==========================================
// BLOG SEARCH FUNCTIONALITY (Blog Page)
// ==========================================
const blogSearchInput = document.getElementById('blogSearchInput');
if (blogSearchInput) {
    blogSearchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase();
        const blogCards = document.querySelectorAll('.blog-card');

        blogCards.forEach(card => {
            const title = card.querySelector('.blog-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');

            if (title.includes(query) || excerpt.includes(query) || tags.includes(query)) {
                card.parentElement.style.display = 'block';
            } else {
                card.parentElement.style.display = 'none';
            }
        });
    });
}

// ==========================================
// TAB NAVIGATION (About Page)
// ==========================================
const tabs = document.querySelectorAll('.tab-item');
const sections = {
    'intro': document.getElementById('intro-section'),
    'experiences': document.getElementById('experiences-section'),
    'educations': document.getElementById('educations-section'),
    'certifications': document.getElementById('certifications-section')
};

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all sections
        Object.values(sections).forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        // Show selected section
        const tabName = tab.getAttribute('data-tab');
        if (sections[tabName]) {
            sections[tabName].style.display = 'block';
        }
        
        // Scroll to top of content smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ==========================================
// TOGGLE ACHIEVEMENTS (About Page)
// ==========================================
function toggleAchievements(button) {
    const parent = button.parentElement;
    let achievementsList;
    
    // Check if button is inside credential-actions or directly before achievements-list
    if (parent.classList.contains('credential-actions')) {
        achievementsList = parent.nextElementSibling;
    } else {
        achievementsList = button.nextElementSibling;
    }
    
    const icon = button.querySelector('i');
    const text = button.querySelector('span');
    
    if (achievementsList && achievementsList.classList.contains('achievements-list')) {
        if (achievementsList.classList.contains('show')) {
            achievementsList.classList.remove('show');
            if (icon) icon.className = 'bi bi-chevron-down';
            if (text) text.textContent = 'Show Achievements';
        } else {
            achievementsList.classList.add('show');
            if (icon) icon.className = 'bi bi-chevron-up';
            if (text) text.textContent = 'Hide Achievements';
        }
    }
}

// Make toggleAchievements available globally
window.toggleAchievements = toggleAchievements;

// ==========================================
// CONTACT FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, message });

        // Show success message (you can customize this)
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        this.reset();
    });
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add body transition
    document.body.style.transition = 'opacity 0.2s ease';
    
    // FIX: Ensure intro section is visible on About page load
    const introSection = document.getElementById('intro-section');
    if (introSection) {
        introSection.style.display = 'block';
    }
    
    console.log('Portfolio initialized successfully');
});