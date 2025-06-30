
  // HOME TAB JS
  function openTab(event, tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-button, .nav-item').forEach(el => el.classList.remove('active'));
    const targetContent = document.getElementById(tabId);
    if (targetContent) targetContent.classList.add('active');
    const isSidebarTab = tabId.startsWith('tab') && !tabId.includes('-content');
    if (isSidebarTab) {
      const sidebarButton = document.querySelector(`.tab-button[onclick*="'${tabId}'"]`);
      if (sidebarButton) sidebarButton.classList.add('active');
      const categoriesFooterButton = document.querySelector('.nav-item[onclick*="tab1"]');
      if (categoriesFooterButton) categoriesFooterButton.classList.add('active');
    } else {
      const footerButton = document.querySelector(`.nav-item[onclick*="'${tabId}'"]`);
      if (footerButton) footerButton.classList.add('active');
    }
  }


// CONTACT TAB JS
  function sendToWhatsApp() {
    // IMPORTANT: Replace with your actual WhatsApp number
    const yourNumber = '2348123456789';

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    if (!message) {
        alert('Please tell us what you need before sending a message.');
        return;
    }

    const prefilledMessage = `Hello Rogate,
My Name: ${name}
My Email: ${email}

My Request:
${message}`;

    const whatsappUrl = `https://wa.me/${+2348028699824}?text=${encodeURIComponent(prefilledMessage)}`;
    
    window.open(whatsappUrl, '_blank');
  }

  document.addEventListener("DOMContentLoaded", function() {
    const homeTabButton = document.querySelector('.nav-item[onclick*="home-content"]');
    if (homeTabButton) homeTabButton.click();
  });


  // Search functionality
  document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('searchIcon');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');
    
    // --- Search Bar Toggle Functionality ---
    searchIcon.addEventListener('click', function (event) {
        // Stop the click from propagating to the document listener below
        event.stopPropagation();
        
        // Check if the search bar is currently closed (width is 0)
        if (searchInput.classList.contains('w-0')) {
            searchInput.classList.remove('w-0');
            searchInput.classList.add('w-48'); // Expand the input field
            searchInput.focus(); // Automatically focus the input
        } else {
            // If it's already open, clicking the icon will close it
            searchInput.classList.remove('w-48');
            searchInput.classList.add('w-0');
            clearHighlights(); // Clear highlights when closing
        }
    });

    // --- Close Search Bar When Clicking Outside ---
    document.addEventListener('click', function (event) {
        // If the click is outside the search container and the input is open
        if (!searchContainer.contains(event.target) && searchInput.classList.contains('w-48')) {
            searchInput.classList.remove('w-48');
            searchInput.classList.add('w-0');
            clearHighlights(); // Clear highlights when closing
        }
    });

    // --- On-Page Search Functionality ---
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.trim();
        
        // First, clear any previous highlights
        clearHighlights();

        // If search term is not empty, start highlighting
        if (searchTerm) {
            highlightText(searchTerm);
        }
    });
    
    function highlightText(term) {
        const pageContent = document.querySelector('main'); // Search only within the main content
        if (!pageContent) return;

        const regex = new RegExp(`(${term})`, 'gi');
        
        // We need a function to traverse the DOM and wrap text nodes
        function traverse(node) {
            if (node.nodeType === 3) { // Text node
                const text = node.nodeValue;
                if (text.match(regex)) {
                    const newNode = document.createElement('span');
                    newNode.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
                    node.parentNode.replaceChild(newNode, node);
                }
            } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') { // Element node
                // Convert childNodes to an array to avoid issues with live NodeLists
                Array.from(node.childNodes).forEach(child => traverse(child));
            }
        }
        
        traverse(pageContent);
    }

    function clearHighlights() {
        const highlights = document.querySelectorAll('span.highlight');
        highlights.forEach(span => {
            // Replace the span with its own text content (the original text)
            const parent = span.parentNode;
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize(); // Merges adjacent text nodes
        });
    }
});