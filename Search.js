// --- Navigation Links ---
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
