# Black Baccara Rose - Routing Structure Guide

## 📁 Folder Structure

```
Black-Baccara-Rose/
├── index.html          # Main HTML file
├── script.js           # Main JavaScript (handles UI interactions)
├── route.js            # Routing system (handles page loading)
├── style.css           # Styling
├── Readme.md
├── images/             # Image assets
├── item/               # Legacy items folder
│   └── asn-ip.html
└── pages/              # New modular pages folder (MAIN CONTENT)
    ├── asn-ip.html
    ├── live-host.html
    ├── url-collection.html
    ├── vulnerability.html
    ├── web-app.html
    ├── sensitive-file.html
    ├── hidden-parameter.html
    ├── directory-file.html
    ├── wordpress.html
    ├── cors-testing.html
    ├── subdomain-takeover.html
    ├── git-repository.html
    ├── ssrf-testing.html
    ├── open-redirect-testing.html
    ├── lfi-testing.html
    ├── xxs-testing.html
    ├── sql-injection-testing.html
    ├── osint.html
    ├── exploitation.html
    ├── reporting.html
    └── other-tools.html
```

## 🚀 How It Works

### 1. **Routing System** (`route.js`)
- Manages page loading from the `/pages` folder
- Maps section IDs to external HTML files
- Handles dynamic content loading without page refresh
- Re-attaches event listeners to dynamically loaded content

### 2. **Main Script** (`script.js`)
- Handles UI interactions (click events, copy buttons, search)
- Integrates with the routing system
- Works with both inline and dynamically loaded content

### 3. **Content Structure** (`pages/` folder)
- Each section is a separate HTML file
- Each file contains only one section div
- Easy to maintain and update individual sections

## 📝 Example Page Structure

**File: `pages/asn-ip.html`**
```html
<div id="asn-ip" class="section-content" style="display: none;">
    <h2>ASN & IP Discovery</h2>
    <p>Discover ASN and IP ranges associated with your target organization.</p>
    
    <div class="tool">
        <h3>Tool Name</h3>
        <div class="command-box">
            <pre class="command-text" data-template="command -d {url}">command -d {url}</pre>
            <button class="copy-button" type="button">Copy</button>
        </div>
    </div>
</div>
```

## ✅ How to Add New Content

### Step 1: Create a new page file in `/pages` folder
```html
<!-- pages/my-new-section.html -->
<div id="my-section-id" class="section-content" style="display: none;">
    <h2>My New Section</h2>
    <p>Description here</p>
    
    <!-- Add your tools/content here -->
</div>
```

### Step 2: Register the route in `route.js`
Add to the `routes` object:
```javascript
const routes = {
    // ... existing routes
    'my-section-id': '/pages/my-new-section.html'
};
```

### Step 3: Add menu link in `index.html` sidebar
```html
<a href="#my-section-id">
    <li>My New Section</li>
</a>
```

### Done! ✨
The routing system will automatically:
- Load the content when clicked
- Reattach event listeners (copy buttons, etc.)
- Update command templates with the URL input

## 🔄 Features

✅ **Dynamic Loading** - Sections load on demand, not all at once
✅ **Modular Code** - Easy to find and edit specific sections
✅ **Reusable Functions** - Copy button and command listeners work with all content
✅ **URL Support** - Commands automatically insert the target URL
✅ **Search** - Book search and filtering works seamlessly

## 💡 Tips

1. **Keep sections focused** - Each page file should handle one specific topic
2. **Use consistent structure** - Follow the same div structure and classes
3. **Always use data-template** - This preserves the original command for URL replacement
4. **Add meaningful titles** - Use clear, descriptive titles for tools/sections

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Content not loading | Check that route is registered in `routes` object |
| Copy button not working | Ensure the `.command-text` element has the right class |
| URL not being replaced | Make sure `{url}` placeholder is in `data-template` |
| Content shows but unstyled | Check that page div has correct classes and IDs |

## 📞 Quick Reference

- **Show a section**: Click menu link (uses `showSection()` function)
- **Load external content**: Routing system auto-loads from `/pages` folder
- **Update UI after loading**: `attachCopyButtonListeners()` and `attachCommandListeners()`
- **Replace URLs in commands**: `updateAllCommands()` function

---

**Note**: The inline sections (Home, Books, Subdomain Enumeration) are still in `index.html` for faster initial load. Other sections use the routing system for better organization.
