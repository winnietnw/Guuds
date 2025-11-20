document.addEventListener("DOMContentLoaded", () => {

    /* ======================
       Change Main Image
    ====================== */
    const mainImage = document.getElementById("main-image");
    const thumbs = document.querySelectorAll(".thumb");

    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
            document.querySelector(".thumb.selected")?.classList.remove("selected");
            thumb.classList.add("selected");
            mainImage.src = thumb.src;
        });
    });

    /* ======================
       Quantity Control
    ====================== */
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const qty = document.getElementById("qty");

    plus.onclick = () => qty.innerText = parseInt(qty.innerText) + 1;
    minus.onclick = () => {
        if (parseInt(qty.innerText) > 1) qty.innerText = parseInt(qty.innerText) - 1;
    };

    /* ======================
       Dynamic Data Example
    ====================== */
    const productData = {
        name: "IU - Love Poem Album",
        price: 750,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        ]
    };

    document.getElementById("product-name").innerText = productData.name;
    document.getElementById("price-value").innerText = productData.price;

    // Load thumbnails
    const thumbList = document.querySelectorAll(".thumb");
    thumbList.forEach((t, i) => {
        if (productData.images[i]) t.src = productData.images[i];
    });

    mainImage.src = productData.images[0];
});
