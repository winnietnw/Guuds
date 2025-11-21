// --- Data ---
const marketplaceItems = [
    { id: 1, type: "Albums", title: "Album Card Set", price: "$45", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 2, type: "Light Stick", title: "Official Lightstick", price: "$60", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 3, type: "Poster", title: "Concert Poster", price: "$15", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 4, type: "Photocard", title: "Photocard Bundle", price: "$25", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 5, type: "Accessories", title: "Fanmade Keychain", price: "$10", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 6, type: "Albums", title: "Signed Mini Album", price: "$120", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 7, type: "Accessories", title: "Group Hoodie", price: "$85", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 8, type: "Albums", title: "Limited Edition Vinyl", price: "$75", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 9, type: "Accessories", title: "T-Shirt", price: "$30", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 10, type: "Accessories", title: "Phone Grip", price: "$12", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 11, type: "Poster", title: "Poster Tube", price: "$18", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
    { id: 12, type: "Albums", title: "Mini Photobook", price: "$28", image: "https://c.animaapp.com/mhwur9gvn1iO6p/img/image.svg" },
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


// --- Utility ---
const getIconSVG = (name, className = 'w-4 h-4') => {
    const icons = {
        'check': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full"><polyline points="20 6 9 17 4 12"/></svg>`
    };
    return icons[name] || '';
};


// --- Rendering Functions ---
const renderCategoryButtons = () => {
    const container = document.getElementById('category-bar-container');
    if (!container) return;

    container.innerHTML = productTypes.map(type => `
        <button class="category-btn">${type.label}</button>
    `).join('');
};

const renderSortOptions = () => {
    const container = document.getElementById('sort-options-container');
    if (!container) return;

    container.innerHTML = sortOptions.map(option => `
        <button class="sort-btn ${option.active ? 'sort-btn-active' : 'sort-btn-inactive'}">
            ${option.label}
        </button>
    `).join('');
};

const renderCheckboxes = (data, idPrefix, showCount = false) => {
    return data.map((item, index) => `
        <div class="checkbox-container">
            <div id="${idPrefix}-${index}" class="checkbox-root" data-state="unchecked">
                <div style="height:100%;width:100%;display:flex;align-items:center;justify-content:center;"></div>
            </div>
            <label class="checkbox-label">${item.label || item}</label>
            ${showCount ? `<span class="checkbox-count">(${item.count})</span>` : ''}
        </div>
    `).join('');
};

const renderFiltersSidebar = () => {
    const container = document.getElementById('filters-sidebar-container');
    if (!container) return;

    container.innerHTML = `
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
        <div class="filter-group">
            ${renderCheckboxes(artists, 'artist')}
        </div>
    `;
};

const renderMarketplaceGrid = () => {
    const container = document.getElementById('marketplace-grid');
    container.innerHTML = marketplaceItems.map((item, index) => `
        <div class="product-card" style="--animation-delay:${index * 50}ms">
            <div class="card-content-wrapper">
                <div class="card-image-wrapper" style="background-image:url('${item.image}')"></div>
                <div class="card-info-group">
                    <p class="card-title">${item.title}</p>
                    <p class="card-price">${item.price}</p>
                </div>
            </div>
        </div>
    `).join('');
};


// --- Filter Logic ---
function dHrv() {
    let selectedTypes = [];
    let selectedAvailability = [];

    document.querySelectorAll("[id^='product-']").forEach((box, index) => {
        if (box.getAttribute("data-state") === "checked") {
            selectedTypes.push(productTypes[index].label);
        }
    });

    document.querySelectorAll("[id^='availability-']").forEach((box, index) => {
        if (box.getAttribute("data-state") === "checked") {
            selectedAvailability.push(availabilityOptions[index].label);
        }
    });

    let filtered = marketplaceItems;

    if (selectedTypes.length > 0) {
        filtered = filtered.filter(item => selectedTypes.includes(item.type));
    }

    if (selectedAvailability.includes("Out Of Stock")) {
        filtered = [];
    }

    renderMarketplaceGridCustom(filtered);
}

function renderMarketplaceGridCustom(items) {
    const container = document.getElementById('marketplace-grid');
    container.innerHTML = items.map((item, index) => `
        <div class="product-card" style="--animation-delay:${index * 50}ms">
            <div class="card-content-wrapper">
                <div class="card-image-wrapper" style="background-image:url('${item.image}')"></div>
                <div class="card-info-group">
                    <p class="card-title">${item.title}</p>
                    <p class="card-price">${item.price}</p>
                </div>
            </div>
        </div>
    `).join('');
}


// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    renderFiltersSidebar();
    renderMarketplaceGrid();
    renderCategoryButtons();
    renderSortOptions();

    setTimeout(() => {
        document.querySelectorAll('.checkbox-root').forEach(checkbox => {
            checkbox.addEventListener('click', function () {
                const state = this.getAttribute('data-state');
                const next = state === 'checked' ? 'unchecked' : 'checked';
                this.setAttribute('data-state', next);

                this.innerHTML = next === 'checked'
                    ? `<div style="height:100%;width:100%;display:flex;align-items:center;justify-content:center;">${getIconSVG('check')}</div>`
                    : '';

                dHrv();
            });
        });
    }, 50);
});
