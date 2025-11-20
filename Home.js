// --- Data for Sections ---
const scrollItems = [
    { id: 1, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Album Card Set", price: "$45" },
    { id: 2, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Official Lightstick", price: "$60" },
    { id: 3, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Concert Poster", price: "$15" },
    { id: 4, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Photocard Bundle", price: "$25" },
    { id: 5, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Fanmade Keychain", price: "$10" },
    { id: 6, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Signed Mini Album", price: "$120" },
    { id: 7, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Group Hoodie", price: "$85" },
    { id: 8, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Limited Edition Vinyl", price: "$75" },
    { id: 9, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "T-Shirt", price: "$30" },
    { id: 10, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Phone Grip", price: "$12" },
    { id: 11, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Poster Tube", price: "$18" },
    { id: 12, image: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image-5.svg", text: "Mini Photobook", price: "$28" },
];

const featureCards = [
    { icon: "https://c.animaapp.com/mhrcnimxAJQP9m/img/group-3.png", title: "Community-Driven", gradient: "linear-gradient(90deg,rgba(190,93,239,1)_31%,rgba(239,93,168,1)_100%)", description: "connect with fellow K-pop fans and trade within your favorite communitise" },
    { icon: "https://c.animaapp.com/mhrcnimxAJQP9m/img/group-4.png", title: "Verfified Sellers", gradient: "linear-gradient(90deg,rgba(239,93,168,1)_15%,rgba(190,93,239,1)_100%)", description: "official stores and verified sellers for authentic merchandise" },
    { icon: "https://c.animaapp.com/mhrcnimxAJQP9m/img/vector-2.svg", title: "Community Safety", gradient: "linear-gradient(90deg,rgba(132,95,244,1)_23%,rgba(239,93,168,1)_100%)", description: "Community ratings and reviews to ensure safe transactions" },
    { icon: "https://c.animaapp.com/mhrcnimxAJQP9m/img/vector-4.svg", title: "Market Insights", gradient: "linear-gradient(90deg,rgba(239,93,168,1)_27%,rgba(132,95,244,1)_100%)", description: "Track trends and prices assor different K-pop communities" },
];

const communityData = [
    { id: 1, name: "STAYs", members: "20.5k members", description: "Connect with fellow STAY and find rare STRAYKIDS collectibles", isJoined: false, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
    { id: 2, name: "ARMYs", members: "12.3k members", description: "ARMY community for BTS merchandise and exclusive items", isJoined: true, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
    { id: 3, name: "UAENAs", members: "13.8k members", description: "Official IU fan community for buying, selling, and trading authentic merchandise", isJoined: true, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
    { id: 4, name: "LUVIEs", members: "12.3k members", description: "Join Luvie community to trade and discover MD/GOODS together!", isJoined: false, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
    { id: 5, name: "ONCEs", members: "18k members", description: "The hub for fans to connect and trade collectibles", isJoined: true, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
    { id: 6, name: "EXO-Ls", members: "30.2k members", description: "Find, collect, and exchange spacial items with fellow fans at EXO-L community", isJoined: false, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
    { id: 7, name: "BLINKS", members: "45.1k members", description: "The official Blackpink fan hub for merchandise exchange.", isJoined: true, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
    { id: 8, name: "MOAs", members: "9.5k members", description: "TXT fan community for trading photocards and albums.", isJoined: false, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
    { id: 9, name: "Carats", members: "22k members", description: "Seventeen fan community - trade rare goods and collectibles.", isJoined: true, imageUrl: "https://c.animaapp.com/mhrcnimxAJQP9m/img/image.svg" },
];

// --- Card Rendering Logic ---
const renderScrollCards = (containerId, data, startDelay) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    data.forEach((item, index) => {
        const delayMs = startDelay + (index * 100);

        const cardHtml = `
            <div 
                class="card-wrapper animated-element" 
                data-delay="${delayMs}" 
                id="scroll-card-${item.id}"
            >
                <div class="card-content">
                    <div class="card-image" style="background-image: url('${item.image}')"></div>
                    <div class="card-details">
                        <p class="text">${item.text}</p>
                        <p class="price">${item.price}</p>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
};

const renderFeatureCards = (containerId, data, startDelay) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    data.forEach((card, index) => {
        const delayMs = startDelay + (index * 100);

        const cardHtml = `
            <div 
                class="feature-card animated-element" 
                data-delay="${delayMs}"
            >
                <div class="feature-card-content">
                    <img alt="${card.title}" src="${card.icon}" />

                    <h3 
                        class="feature-card-title"
                        style="background: ${card.gradient}; -webkit-background-clip: text; background-clip: text;"
                    >
                        ${card.title}
                    </h3>

                    <p class="feature-card-description">
                        ${card.description}
                    </p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
};

const renderMarketplaceCards = (containerId, data, startDelay) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    data.forEach((community, index) => {
        const delayMs = startDelay + (index * 100);

        const cardHtml = `
            <div 
                class="marketplace-card-wrapper animated-element" 
                data-delay="${delayMs}"
            >
                <div class="marketplace-card-content">
                    <div class="marketplace-card-image" style="background-image: url('${community.imageUrl}')">
                        <h3 class="marketplace-card-title">${community.name}</h3>
                    </div>
                    <div class="marketplace-card-body">
                        <p class="marketplace-card-description">${community.description}</p>
                        <p class="marketplace-card-members">${community.members}</p>
                        <div class="marketplace-card-actions">
                            <button class="join-btn">View</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
};

// --- Initialization and Animation Application ---
document.addEventListener('DOMContentLoaded', () => {

    renderMarketplaceCards('marketplace-scroll-container', communityData, 400);

    renderScrollCards('community-scroll-container', scrollItems, 400);

    renderFeatureCards('feature-grid', featureCards, 400);

    const homeLink = document.querySelector('.header-links a:nth-child(1)');
    if (homeLink) {
        homeLink.classList.add('active-link');
    }

    const animatedElements = document.querySelectorAll('.animated-element');

    animatedElements.forEach(el => {
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        el.classList.add('animate-start');
        el.style.animationDelay = `${delay}ms`;
    });
});
