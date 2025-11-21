document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animated-element");

    animatedElements.forEach(el => {
        const delay = el.style.getPropertyValue("--animation-delay") || "0ms";
        el.classList.add("animate-start");
        el.style.animationDelay = delay;
    });
});

const navLinks = [
    { label: "Home", href: "Home.html", active: false },
    { label: "Marketplace", href: "Market_Place.html", active: false },
    { label: "Search", href: "Search.html", active: true },
    { label: "Communities", href: "Communities.html", active: false },
    { label: "Team", href: "About.html", active: false },
];

const renderNavLinks = () => {
    const container = document.getElementById("header-nav");
    if (!container) return;

    container.innerHTML = navLinks
        .map(
            (link) => `
        <a 
            href="${link.href}" 
            class="nav-link ${link.active ? "active-link" : ""}"
        >
            ${link.label}
        </a>
    `
        )
        .join("");
};

// --- Animation handling ---
const initAnimations = () => {
    const animatedElements = document.querySelectorAll(".animated-element");
    animatedElements.forEach((el) => {
        const delay = parseInt(el.getAttribute("data-delay") || "0");
        el.style.animationDelay = `${delay}ms`;
    });
};

document.addEventListener("DOMContentLoaded", () => {
    renderNavLinks();
    initAnimations();
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");

    searchBtn.addEventListener("click", () => {
        const keyword = searchInput.value.trim();

        if (keyword === "") {
            alert("Please enter a search term before searching.");
            return;
        }
        window.location.href = `AfterSearch2.html`;
    });
});

