/**
 * Collapsible ChangeGroup functionality
 * Handles toggling of ChangeGroup sections in patch notes
 */

class CollapseManager {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCollapseHandlers());
        } else {
            this.setupCollapseHandlers();
        }
    }

    setupCollapseHandlers() {
        const changeGroupTitles = document.querySelectorAll('.ChangeGroupTitle');
        
        changeGroupTitles.forEach(title => {
            // Add click event listener
            title.addEventListener('click', (e) => this.toggleChangeGroup(e));
            
            // Add keyboard support
            title.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleChangeGroup(e);
                }
            });
            
            // Make it focusable for accessibility
            title.setAttribute('tabindex', '0');
            title.setAttribute('role', 'button');
            title.setAttribute('aria-expanded', 'true');
        });
    }

    toggleChangeGroup(event) {
        const title = event.currentTarget;
        const changeGroup = title.closest('.ChangeGroup');
        
        if (!changeGroup) return;

        const isCollapsed = changeGroup.classList.contains('collapsed');
        
        if (isCollapsed) {
            this.expandChangeGroup(changeGroup, title);
        } else {
            this.collapseChangeGroup(changeGroup, title);
        }
    }

    collapseChangeGroup(changeGroup, title) {
        changeGroup.classList.add('collapsed');
        title.setAttribute('aria-expanded', 'false');
        
        // Add a subtle animation delay
        setTimeout(() => {
            changeGroup.style.borderBottomWidth = '1px';
        }, 150);
    }

    expandChangeGroup(changeGroup, title) {
        changeGroup.classList.remove('collapsed');
        title.setAttribute('aria-expanded', 'true');
        changeGroup.style.borderBottomWidth = '';
    }

    // Public method to collapse all groups
    collapseAll() {
        const changeGroups = document.querySelectorAll('.ChangeGroup');
        changeGroups.forEach(group => {
            const title = group.querySelector('.ChangeGroupTitle');
            if (title && !group.classList.contains('collapsed')) {
                this.collapseChangeGroup(group, title);
            }
        });
    }

    // Public method to expand all groups
    expandAll() {
        const changeGroups = document.querySelectorAll('.ChangeGroup');
        changeGroups.forEach(group => {
            const title = group.querySelector('.ChangeGroupTitle');
            if (title && group.classList.contains('collapsed')) {
                this.expandChangeGroup(group, title);
            }
        });
    }
}

// Initialize the collapse manager
const collapseManager = new CollapseManager();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CollapseManager;
}
