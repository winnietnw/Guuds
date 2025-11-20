const albumIUItems = [
    { id: 1, title: "IU Album - Palette", price: "$25", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg", link: "ProductDetail.html" },
    { id: 2, title: "IU Concert Photobook", price: "$32", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 3, title: "IU Poster", price: "$10", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 4, title: "IU Photocard Set", price: "$12", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 5, title: "IU Lightstick Keyring", price: "$15", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 6, title: "IU Album - Lilac", price: "$29", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },

    { id: 7, title: "IU Mini Album - Love Poem", price: "$18", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 8, title: "IU Concert DVD", price: "$40", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 9, title: "IU T-Shirt Official", price: "$22", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 10, title: "IU Fanmade Badge", price: "$8", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 11, title: "IU Magazine Cover", price: "$14", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" },
    { id: 12, title: "IU Limited Photocard", price: "$20", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" }
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
                    <img src="${item.image}">
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

            if (product.link) {
                window.location.href = product.link;
            }
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    renderAlbumItems();
});
