// Function to attach copy button listeners (reusable for dynamic content)
function attachCopyButtonListeners() {
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        // Remove existing listeners by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        if (!newButton.dataset.originalText) {
            newButton.dataset.originalText = newButton.textContent;
        }
        newButton.addEventListener('click', () => {
            const commandElement = newButton.closest('.command-box')?.querySelector('.command-text');
            if (commandElement) {
                copyText(commandElement.textContent.trim(), newButton);
            }
        });
    });
}

// Function to attach command text listeners (reusable for dynamic content)
function attachCommandListeners() {
    const commandTextElements = document.querySelectorAll('.command-text');
    commandTextElements.forEach(element => {
        const template = element.dataset.template || element.textContent;
        element.dataset.template = template.trim();
        element.addEventListener('click', () => {
            copyText(element.textContent.trim(), element.closest('.command-box')?.querySelector('.copy-button'));
        });
    });
}

// Hide all sections and show the target section
async function showSection(sectionId) {
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    let targetSection = document.querySelector(sectionId);
    
    // If section doesn't exist, try loading it from external file
    if (!targetSection && window.loadPageContent) {
        const sectionIdClean = sectionId.replace('#', '');
        await window.loadPageContent(sectionIdClean);
        targetSection = document.querySelector(sectionId);
    }
    
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling for anchor links
const urlInput = document.getElementById('url-input');

function getDomainFromInput(value) {
    const trimmed = value.trim();
    if (!trimmed) {
        return '{example.com}';
    }

    try {
        const normalized = trimmed.match(/^https?:\/\//i) ? trimmed : `https://${trimmed}`;
        const parsed = new URL(normalized);
        return parsed.hostname || trimmed;
    } catch (error) {
        return trimmed;
    }
}

function replaceUrlPlaceholder(template, domain) {
    return template.replace(/\{(?:example\.com|url)\}/gi, domain);
}

function updateAllCommands() {
    const domain = getDomainFromInput(urlInput ? urlInput.value : '');
    const commandTextElements = document.querySelectorAll('.command-text');
    commandTextElements.forEach(element => {
        const template = element.dataset.template || element.textContent;
        element.textContent = replaceUrlPlaceholder(template, domain);
    });
}

function copyText(text, button) {
    if (!text) return;

    const finish = () => {
        if (button) {
            const original = button.dataset.originalText || 'Copy';
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = original;
            }, 1200);
        }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(finish).catch(() => {
            const fallback = document.createElement('textarea');
            fallback.value = text;
            document.body.appendChild(fallback);
            fallback.select();
            document.execCommand('copy');
            document.body.removeChild(fallback);
            finish();
        });
    } else {
        const fallback = document.createElement('textarea');
        fallback.value = text;
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand('copy');
        document.body.removeChild(fallback);
        finish();
    }
}

if (urlInput) {
    urlInput.addEventListener('input', updateAllCommands);
}

const bookSearchInput = document.getElementById('book-search');
const bookItems = Array.from(document.querySelectorAll('.book-item'));

function filterBookList(query) {
    if (!bookItems.length) return;
    const normalized = (query || '').trim().toLowerCase();
    let anyVisible = false;

    bookItems.forEach(item => {
        const title = (item.querySelector('.book-title')?.textContent || item.querySelector('.book-link')?.textContent || '').toLowerCase();
        const description = item.querySelector('p')?.textContent.toLowerCase() || '';
        const matches = !normalized || title.includes(normalized) || description.includes(normalized);
        item.style.display = matches ? '' : 'none';
        if (matches) anyVisible = true;
    });

    const noResults = document.querySelector('.book-no-results');
    if (noResults) {
        noResults.style.display = anyVisible ? 'none' : 'block';
    }
}

if (bookSearchInput) {
    bookSearchInput.addEventListener('input', event => filterBookList(event.target.value));
}

// Initialize event listeners for existing command elements
attachCommandListeners();
attachCopyButtonListeners();

updateAllCommands();

// Handle anchor links with routing support
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', async function (e) {
        const href = this.getAttribute('href');
        
        // Ignore empty anchors or mailto links
        if (href === '#' || href.startsWith('mailto')) {
            return;
        }
        
        e.preventDefault();
        await showSection(href);
    });
});
