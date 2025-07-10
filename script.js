/**
 * Handles switching between content tabs and toggles sidebar visibility.
 * Relies on CSS classes to show/hide content.
 * @param {Event | null} event - The click event, or null if called programmatically.
 * @param {string} tabId - The ID of the content tab to open.
 */
function openTab(event, tabId) {
    const appContainer = document.querySelector('.app-container');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Only clear the search if it's a direct user click on a tab, not a programmatic call.
    if (event && searchInput.value) {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        // Call filterAndReorderContent to restore the state before switching tabs.
        filterAndReorderContent(''); 
    }

    // Deactivate all tabs and navigation buttons
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none'; // Explicitly hide all content sections
    });
    document.querySelectorAll('.tab-button, .nav-item').forEach(el => el.classList.remove('active'));
    
    // Check if the target tab is a main category/sidebar tab
    const isSidebarTab = tabId.startsWith('tab') && !tabId.includes('-content');

    // ** MODIFIED: Show or hide the sidebar based on the tab being opened **
    if (isSidebarTab) {
        // This is a category tab, so ensure the sidebar is visible.
        appContainer.classList.remove('sidebar-hidden');
    } else {
        // This is Home, Explore, Partner, or Contact, so hide the sidebar.
        appContainer.classList.add('sidebar-hidden');
    }

    // Activate the clicked tab and its corresponding buttons
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block'; // Explicitly show the target content
    }

    // Handle active state for both sidebar and footer buttons
    if (isSidebarTab) {
        const sidebarButton = document.querySelector(`.tab-button[onclick*="'${tabId}'"]`);
        if (sidebarButton) sidebarButton.classList.add('active');
        // Also activate the generic 'Categories' footer button if a sidebar tab is chosen
        const categoriesFooterButton = document.querySelector('.nav-item[onclick*="tab1"]');
        if (categoriesFooterButton) categoriesFooterButton.classList.add('active');
    } else {
        const footerButton = document.querySelector(`.nav-item[onclick*="'${tabId}'"]`);
        if (footerButton) footerButton.classList.add('active');
    }

    // ======================================================
    // === NEW CODE FOR FOOTER ANIMATION - ADD THIS BLOCK ===
    // ======================================================
    const activeNavItem = document.querySelector(`.nav-item.active`);
    if (activeNavItem) {
        const activeIndex = activeNavItem.dataset.index;
        const footerNav = document.querySelector('.footer-nav');
        footerNav.style.setProperty('--active-index', activeIndex);
    }
    // ======================================================
    // ============= END OF NEW CODE BLOCK ==================
    // ======================================================
}

/**
 * Formats a message and opens it in WhatsApp.
 */
function sendToWhatsApp() {
    const yourNumber = '+2348028699824'; // IMPORTANT: Replace with your actual WhatsApp number
    const name = document.getElementById('contactName').value;
    // MODIFICATION: Changed 'contactEmail' to 'contactInfo' to match the updated HTML
    const contactInfo = document.getElementById('contactInfo').value;
    const message = document.getElementById('contactMessage').value;

    if (!message) {
        console.warn('Please tell us what you need before sending a message.');
        return;
    }
    // Updated the prefilled message to use the new variable
    const prefilledMessage = `Hello,\nMy Name: ${name}\nMy Contact: ${contactInfo}\n\nMy Request:\n${message}`;
    const whatsappUrl = `https://wa.me/${yourNumber}?text=${encodeURIComponent(prefilledMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Global variables to manage state
let originalSectionsInOrder = [];
let activeTabIdBeforeSearch = null; // ** NEW: To remember state **

/**
 * Removes previously highlighted text.
 * @param {HTMLElement} container - The element to remove highlights from.
 */
function unhighlight(container) {
    const highlights = container.querySelectorAll('mark.highlight');
    highlights.forEach(highlight => {
        const text = document.createTextNode(highlight.textContent);
        highlight.parentNode.replaceChild(text, highlight);
    });
    container.normalize();
}

/**
 * Highlights search term occurrences in a node.
 * @param {HTMLElement} node - The HTML element to search within.
 * @param {string} term - The search term to highlight.
 */
function highlightText(node, term) {
    if (!term.trim()) return;

    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let textNode;
    const nodesToReplace = [];
    const lowerCaseTerm = term.toLowerCase();

    while (textNode = walker.nextNode()) {
        if (textNode.parentElement.tagName === 'SCRIPT' || textNode.parentElement.tagName === 'STYLE') continue;

        const lowerCaseText = textNode.nodeValue.toLowerCase();
        if (lowerCaseText.indexOf(lowerCaseTerm) === -1) continue;
        
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let startIndex = 0;

        while ((startIndex = lowerCaseText.indexOf(lowerCaseTerm, lastIndex)) > -1) {
            fragment.appendChild(document.createTextNode(textNode.nodeValue.substring(lastIndex, startIndex)));
            const mark = document.createElement('mark');
            mark.className = 'highlight';
            mark.textContent = textNode.nodeValue.substring(startIndex, startIndex + term.length);
            fragment.appendChild(mark);
            lastIndex = startIndex + term.length;
        }
        fragment.appendChild(document.createTextNode(textNode.nodeValue.substring(lastIndex)));
        nodesToReplace.push({ original: textNode, replacement: fragment });
    }

    nodesToReplace.forEach(item => {
        if (item.original.parentNode) {
            item.original.parentNode.replaceChild(item.replacement, item.original);
        }
    });
}

/**
 * ** REVISED: Filters content and correctly restores state on clear. **
 * @param {string} term - The search term.
 */
function filterAndReorderContent(term) {
    const lowerCaseTerm = term.toLowerCase();
    const contentMain = document.querySelector('.content-main');
    
    contentMain.style.opacity = '0';

    setTimeout(() => {
        unhighlight(contentMain);
        const existingNoResults = contentMain.querySelector('.no-results-message');
        if (existingNoResults) existingNoResults.remove();

        // If search is cleared, restore the original active tab
        if (!lowerCaseTerm) {
            // Restore original DOM order
            originalSectionsInOrder.forEach(section => contentMain.appendChild(section));
            
            // Re-open the tab that was active before the search.
            // openTab will handle setting the correct display and active classes.
            if (activeTabIdBeforeSearch) {
                openTab(null, activeTabIdBeforeSearch); 
            } else {
                // Fallback to home if no tab was active
                openTab(null, 'blog-content');
            }
            activeTabIdBeforeSearch = null; // Reset for the next search
        } else {
            // This is a new or ongoing search
            if (activeTabIdBeforeSearch === null) {
                const activeContent = document.querySelector('.tab-content.active');
                activeTabIdBeforeSearch = activeContent ? activeContent.id : 'blog-content';
            }
            
            // Deactivate all tabs to show search results over everything
            document.querySelectorAll('.tab-content, .tab-button, .nav-item').forEach(el => el.classList.remove('active'));

            const matchingSections = [];
            originalSectionsInOrder.forEach(section => {
                if (section.textContent.toLowerCase().includes(lowerCaseTerm)) {
                    matchingSections.push(section);
                }
            });

            originalSectionsInOrder.forEach(section => section.style.display = 'none');

            matchingSections.forEach(section => {
                highlightText(section, term);
                section.style.display = 'block';
                contentMain.prepend(section);
            });
            
            if (matchingSections.length === 0) {
                const noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message';
                const sanitizedTerm = term.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                noResultsMessage.innerHTML = `No results found for '<strong>${sanitizedTerm}</strong>'`;
                contentMain.appendChild(noResultsMessage);
            }
        }
        
        contentMain.style.opacity = '1';
    }, 300); // Match timeout with CSS transition duration
}

// This runs once the entire page is loaded
document.addEventListener('DOMContentLoaded', function () {
    const homeTabButton = document.querySelector('.nav-item[onclick*="tab1"]');
    if (homeTabButton) homeTabButton.click();
    
    const contentMain = document.querySelector('.content-main');
    originalSectionsInOrder = Array.from(contentMain.children).filter(node => node.tagName === 'SECTION');

    const searchIcon = document.getElementById('searchIcon');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    searchIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        } else if (searchInput.value) {
            clearSearchBtn.click();
        }
    });

    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        this.style.display = 'none';
        filterAndReorderContent('');
        searchInput.focus();
    });

    searchInput.addEventListener('input', function () {
        clearSearchBtn.style.display = this.value ? 'block' : 'none';
        filterAndReorderContent(this.value);
    });

    document.addEventListener('click', function (event) {
        if (!searchContainer.contains(event.target) && searchInput.classList.contains('active')) {
            searchInput.classList.remove('active');
        }
    });
});