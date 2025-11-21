document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animated-element");

    animatedElements.forEach(el => {
        const delay = el.style.getPropertyValue("--animation-delay") || "0ms";
        el.classList.add("animate-start");
        el.style.animationDelay = delay;
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const ratingButtons = document.querySelectorAll(".rating-btn");

    const nameInput = document.getElementById("name");
    const categorySelect = document.getElementById("category");
    const communityInput = document.getElementById("community");

    const inStockCheckbox = document.getElementById("in-stock");
    const outStockCheckbox = document.getElementById("out-stock");

    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clearBtn");

    let selectedRating = null;

    ratingButtons.forEach((btn) => {
        btn.addEventListener("click", () => {

            if (btn.classList.contains("selected")) {
                btn.classList.remove("selected");
                selectedRating = null;
                return;
            }

            ratingButtons.forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");

            selectedRating = btn.getAttribute("data-rating");
        });
    });
    clearBtn.addEventListener("click", () => {

        nameInput.value = "";
        communityInput.value = "";
        categorySelect.selectedIndex = 0;

        ratingButtons.forEach((b) => b.classList.remove("selected"));
        selectedRating = null;

        inStockCheckbox.checked = true;
        outStockCheckbox.checked = true;

        console.log("Form cleared");
    });

    searchBtn.addEventListener("click", () => {

    const searchData = {
        name: nameInput.value.trim(),
        category: categorySelect.value.trim(),
        community: communityInput.value.trim(),
        rating: selectedRating,
        inStock: inStockCheckbox.checked,
        outStock: outStockCheckbox.checked,
    };

    const noName      = searchData.name === "";
    const noCategory  = searchData.category === "" || searchData.category === "none";
    const noCommunity = searchData.community === "";
    const noRating    = selectedRating === null;

    if (noName && noCategory && noCommunity && noRating) {
        alert("Please enter or select at least one search filter.");
        return;
    }

    console.log("=== SEARCH DATA ===", searchData);

    window.location.href = "AfterSearch.html";
    });
});
