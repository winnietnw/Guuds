
const albumIUItems = [
    { 
        id: 1, 
        title: "IU Album - Palette", 
        price: "$25", 
        image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
        link: "ProductDetail.html"
    },
    { 
        id: 2, 
        title: "IU Concert Photobook", 
        price: "$32", 
        image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    },
    { 
        id: 3, 
        title: "IU Poster", 
        price: "$10", 
        image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    },
    { 
        id: 4, 
        title: "IU Photocard Set", 
        price: "$12", 
        image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    },
    { 
        id: 5, 
        title: "IU Lightstick Keyring", 
        price: "$15", 
        image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    },
    { 
        id: 6, 
        title: "IU Album - Lilac", 
        price: "$29", 
        image: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    }
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
