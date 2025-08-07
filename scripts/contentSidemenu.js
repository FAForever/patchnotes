/**
 * Enhanced Content Sidemenu JavaScript
 * Provides interactive functionality for the content navigation sidebar
 */

// Initialize sidemenu functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContentSidemenu();
});

function initContentSidemenu() {
    initSectionToggles();
    initScrollProgress();
    initActiveNavigation();
    initQuickActions();
}

/**
 * Initialize section toggle functionality
 */
function initSectionToggles() {
    const sectionToggles = document.querySelectorAll('.SectionToggle');
    
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const section = this.closest('.NavSection');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle section
            if (isExpanded) {
                section.classList.add('collapsed');
                this.setAttribute('aria-expanded', 'false');
            } else {
                section.classList.remove('collapsed');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/**
 * Initialize scroll progress tracking
 */
function initScrollProgress() {
    const progressFill = document.getElementById('readingProgress');
    if (!progressFill) return;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressFill.style.width = Math.min(100, Math.max(0, progress)) + '%';
    }
    
    // Update on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateProgress();
}

/**
 * Initialize active navigation highlighting
 */
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.NavLink');
    const sections = Array.from(navLinks).map(link => {
        const href = link.getAttribute('href');
        return {
            link: link,
            element: document.querySelector(href),
            id: href.substring(1)
        };
    }).filter(item => item.element);
    
    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 100; // Offset for header
        let activeSection = null;
        
        // Find the currently visible section
        sections.forEach(section => {
            const rect = section.element.getBoundingClientRect();
            const top = rect.top + window.pageYOffset;
            
            if (scrollPos >= top) {
                activeSection = section;
            }
        });
        
        // Update active states
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeSection) {
            activeSection.link.classList.add('active');
        }
    }
    
    // Update on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateActiveNav();
}

/**
 * Initialize quick action buttons
 */
function initQuickActions() {
    // These functions are called by onclick attributes, but we ensure they exist
    if (typeof window.scrollToTop !== 'function') {
        window.scrollToTop = function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }
    
    if (typeof window.toggleAllSections !== 'function') {
        window.toggleAllSections = function() {
            const sections = document.querySelectorAll('.NavSection');
            const anyExpanded = Array.from(sections).some(section => 
                !section.classList.contains('collapsed')
            );
            
            sections.forEach(section => {
                const toggle = section.querySelector('.SectionToggle');
                if (anyExpanded) {
                    section.classList.add('collapsed');
                    toggle.setAttribute('aria-expanded', 'false');
                } else {
                    section.classList.remove('collapsed');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
        };
    }
    
    if (typeof window.printPage !== 'function') {
        window.printPage = function() {
            window.print();
        };
    }
}

/**
 * Smooth scroll enhancement for navigation links
 */
document.addEventListener('click', function(e) {
    const link = e.target.closest('.NavLink');
    if (link && link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // Account for any fixed headers
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation through sidemenu
    if (e.target.classList.contains('SectionToggle')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }
});

/**
 * Auto-collapse sections on mobile for better UX
 */
function handleResponsiveCollapse() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const sections = document.querySelectorAll('.NavSection');
        sections.forEach(section => {
            const hasActiveLink = section.querySelector('.NavLink.active');
            if (!hasActiveLink) {
                section.classList.add('collapsed');
                const toggle = section.querySelector('.SectionToggle');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(handleResponsiveCollapse, 250);
});

// Initialize responsive behavior
handleResponsiveCollapse();
