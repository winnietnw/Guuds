const marketplaceItems = [
    { id: 1, title: "Album Card Set", price: "$45", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 2, title: "Official Lightstick", price: "$60", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 3, title: "Concert Poster", price: "$15", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 4, title: "Photocard Bundle", price: "$25", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 5, title: "Fanmade Keychain", price: "$10", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 6, title: "Signed Mini Album", price: "$120", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 7, title: "Group Hoodie", price: "$85", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 8, title: "Limited Edition Vinyl", price: "$75", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 9, title: "T-Shirt", price: "$30", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 10, title: "Phone Grip", price: "$12", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 11, title: "Poster Tube", price: "$18", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 12, title: "Mini Photobook", price: "$28", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
];

const sortOptions = [
    { label: "Newest", active: true },
    { label: "Popular", active: false },
    { label: "Most Reliable Saller", active: false },
];

const storeFilters = [
    { label: "All Store", checked: false },
    { label: "Official Store", checked: false },
    { label: "Community Seller", checked: false },
];

const productTypes = [
    { label: "Albums", count: 890 },
    { label: "Light Stick", count: 180 },
    { label: "Photocard", count: 2000 },
    { label: "Poster", count: 560 },
    { label: "Accessories", count: 790 },
];

const availabilityOptions = [
    { label: "In Stock", checked: false },
    { label: "Out Of Stock", checked: false },
];

const artists = [
    "BTS", "BLACKPINK", "TWICE", "IU", "Stray Kids", "NewJeans", "IVE", "aespa",
];

// --- Utility Functions ---
const getIconSVG = (name, className = 'w-4 h-4') => {
    const icons = {
        'trending-up': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
        'award': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 18 17 23 15.79 13.88"/></svg>`,
        'check': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full"><polyline points="20 6 9 17 4 12"/></svg>`,
        'null': '',
    };
    return icons[name] || '';
};

// --- Rendering Functions (Unchanged Logic, uses updated structure) ---

const renderNavLinks = () => {
    const container = document.getElementById('header-nav');
    if (!container) return;
    container.innerHTML = navLinks.map(link => `
                <a 
                    href="${link.href}" 
                    class="nav-link ${link.active ? 'active-link' : ''}"
                >
                    ${link.label}
                </a>
            `).join('');
};

const renderSortOptions = () => {
    const container = document.getElementById('sort-options-container');
    if (!container) return;
    container.innerHTML = sortOptions.map(option => `
                <button
                    class="sort-btn ${option.active ? 'sort-btn-active' : 'sort-btn-inactive'}"
                >
                    <span style="display:flex; align-items:center; gap:0.5rem;">
                        ${option.label}
                        ${getIconSVG(option.icon, 'w-4 h-4')}
                    </span>
                </button>
            `).join('');
};

const renderCheckboxes = (data, idPrefix, showCount = false) => {
    return data.map((item, index) => {
        const label = item.label || item;
        const count = item.count ? `(${item.count})` : '';
        const checked = item.checked ? 'checked' : 'unchecked';

        return `
                    <div class="checkbox-container">
                        <div 
                            id="${idPrefix}-${index}" 
                            class="checkbox-root" 
                            data-state="${checked}"
                        >
                            <div style="height:100%; width:100%; display:flex; align-items:center; justify-content:center;">
                                ${checked === 'checked' ? getIconSVG('check', 'w-3 h-3') : ''}
                            </div>
                        </div>
                        <label
                            for="${idPrefix}-${index}"
                            class="checkbox-label"
                        >
                            ${label}
                        </label>
                        ${showCount ? `<span class="checkbox-count">${count}</span>` : ''}
                    </div>
                `;
    }).join('');
};

const renderCategoryButtons = () => {
    const container = document.getElementById('category-bar-container');
    if (!container) return;
    // Display first 5 product types as categories
    container.innerHTML = productTypes.slice(0, 5).map(type => `
                <button class="category-btn">
                    ${type.label}
                </button>
            `).join('');
};

const renderFiltersSidebar = () => {
    const container = document.getElementById('filters-sidebar-container');
    if (!container) return;

    const html = `
                <div class="w-full">
                    <h2 class="filter-section-title">Filters</h2>

                    <div class="filter-group">
                        ${renderCheckboxes(storeFilters, 'store')}
                    </div>

                    <div class="divider"></div>

                    <h3 class="filter-section-title">Product Type</h3>
                    <div class="filter-group">
                        ${renderCheckboxes(productTypes, 'product', true)}
                    </div>

                    <div class="divider"></div>

                    <h3 class="filter-section-title">Availability</h3>
                    <div class="filter-group">
                        ${renderCheckboxes(availabilityOptions, 'availability')}
                    </div>

                    <div class="divider"></div>

                    <h3 class="filter-section-title">Artist</h3>
                    <div class="filter-group" style="margin-bottom: 0;">
                        ${renderCheckboxes(artists, 'artist')}
                    </div>
                </div>
            `;
    container.innerHTML = html;
};

const renderMarketplaceGrid = () => {
    const container = document.getElementById('marketplace-grid');
    if (!container) return;

    container.innerHTML = marketplaceItems.map((item, index) => `
                <div
                    class="product-card animated-element"
                    style="--animation-delay: ${600 + (index * 50)}ms;"
                >
                    <div class="card-content-wrapper">
                        <div class="card-image-wrapper" 
                            style="background-image: url('${item.image}')"
                        ></div>

                        <div class="card-info-group">
                            <div style="display:flex; align-items:flex-start; width:100%;">
                                <p class="card-title">
                                    ${item.title}
                                </p>
                            </div>

                            <div style="display:inline-flex; align-items:flex-start;">
                                <p class="card-price">
                                    ${item.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
};



// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderNavLinks();
    renderSortOptions();
    renderCategoryButtons();
    renderFiltersSidebar();
    renderMarketplaceGrid();

    // Set Checkbox interactivity (simplified demo)
    document.querySelectorAll('.checkbox-root').forEach(checkbox => {
        checkbox.addEventListener('click', function () {
            const currentState = this.getAttribute('data-state');
            const newState = currentState === 'checked' ? 'unchecked' : 'checked';
            this.setAttribute('data-state', newState);
            // Rerender check icon if applicable
            this.innerHTML = newState === 'checked' ? `<div style="height:100%; width:100%; display:flex; align-items:center; justify-content:center;">${getIconSVG('check', 'w-3 h-3')}</div>` : '';
        });
    });

    // Apply animation logic to ALL animated elements
    const animatedElements = document.querySelectorAll('.animated-element');

    animatedElements.forEach(el => {
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        // Apply CSS animation with calculated delay (Overridden by inline styles for marketplace items)
        el.classList.add('animate-start');
        el.style.animationDelay = `${el.style.animationDelay || delay + 'ms'}`;
    });
});