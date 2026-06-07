// Router Configuration for Black Baccara Rose

const routes = {
    'asn-ip': '/pages/asn-ip.html',
    'live-host': '/pages/live-host.html',
    'url-collection': '/pages/url-collection.html',
    'vulnerability': '/pages/vulnerability.html',
    'web-app': '/pages/web-app.html',
    'sensitive-file': '/pages/sensitive-file.html',
    'hidden-parameter': '/pages/hidden-parameter.html',
    'directory-file': '/pages/directory-file.html',
    'wordpress': '/pages/wordpress.html',
    'cors-testing': '/pages/cors-testing.html',
    'subdomain-takeover': '/pages/subdomain-takeover.html',
    'git-repository': '/pages/git-repository.html',
    'ssrf-testing': '/pages/ssrf-testing.html',
    'open-redirect-testing': '/pages/open-redirect-testing.html',
    'lfi-testing': '/pages/lfi-testing.html',
    'xxs-testing': '/pages/xxs-testing.html',
    'sql-injection-testing': '/pages/sql-injection-testing.html',
    'osint': '/pages/osint.html',
    'exploitation': '/pages/exploitation.html',
    'reporting': '/pages/reporting.html',
    'other-tools': '/pages/other-tools.html'
};

// Load content from external file
async function loadPageContent(sectionId) {
    const filePath = routes[sectionId];
    
    if (!filePath) {
        console.warn(`No route found for section: ${sectionId}`);
        return;
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Get the section element
        const newSection = temp.querySelector(`#${sectionId}`);
        
        if (newSection) {
            // Find existing section or create new one
            let existingSection = document.querySelector(`#${sectionId}`);
            if (existingSection) {
                existingSection.replaceWith(newSection);
            } else {
                document.getElementById('heroarea').appendChild(newSection);
            }
            
            // Re-attach event listeners for copy buttons
            attachCopyButtonListeners();
            attachCommandListeners();
        }
    } catch (error) {
        console.error(`Error loading content for ${sectionId}:`, error);
    }
}

// Export for use in script.js
window.loadPageContent = loadPageContent;
window.routes = routes;
