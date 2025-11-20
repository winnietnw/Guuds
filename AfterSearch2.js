const albumIUItems = [
    { id: 1, title: "IU Album - Love Poem (Limited Ed.)", price: "$35", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg", link: "ProductDetail.html" },

    { id: 2, title: "BLACKPINK Born Pink Photobook", price: "$42", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 3, title: "Stray Kids MAXIDENT Poster Set", price: "$12", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 4, title: "NewJeans Bunny Keyring", price: "$18", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 5, title: "TWICE Official Photocard Pack", price: "$20", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 6, title: "SEVENTEEN Lightstick Ver.3", price: "$55", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },

    { id: 7, title: "BTS Jimin Mini Poster Pack", price: "$14", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 8, title: "IVE The 1st Album 'I'VE IVE'", price: "$29", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 9, title: "IU Season’s Greeting Set 2026", price: "$48", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },

    { id: 10, title: "aespa Official Keychain", price: "$10", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 11, title: "LE SSERAFIM 'ANTIFRAGILE' Album", price: "$24", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 12, title: "IU Concert Blu-ray 'Love Poem'", price: "$58", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" }
];

function renderAlbumItems() {
    const container = document.querySelector(".grid-container");
    if (!container) return;

    let html = "";

    albumIUItems.forEach((item, index) => {
        const cardClass = index === 0 ? "card highlight" : "card";

        html += `
            <div class="${cardClass}" data-id="${item.id}">
                <div class="img-box">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <p class="card-title">${item.title}</p>
                <p class="card-price">${item.price}</p>
            </div>
        `;
    });

    container.innerHTML = html;

    attachCardEvents();
}
function attachCardEvents() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            const id = parseInt(card.getAttribute("data-id"));
            const product = albumIUItems.find(item => item.id === id);

            if (product && product.link) {
                window.location.href = product.link;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderAlbumItems();
});
