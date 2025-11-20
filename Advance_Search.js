document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       ELEMENTS
    ============================ */
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

            // ถ้าคลิกอันเดิม → ยกเลิกเลือก
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

        // รีเซ็ต rating
        ratingButtons.forEach((b) => b.classList.remove("selected"));
        selectedRating = null;

        // reset availability
        inStockCheckbox.checked = true;
        outStockCheckbox.checked = true;

        console.log("Form cleared");
    });


    searchBtn.addEventListener("click", () => {

        const searchData = {
            name: nameInput.value.trim(),
            category: categorySelect.value,
            community: communityInput.value.trim(),
            rating: selectedRating ? `>= ${selectedRating}` : "Any",
            inStock: inStockCheckbox.checked,
            outStock: outStockCheckbox.checked,
        };

        console.log("=== SEARCH DATA ===");
        console.log(searchData);
    });

});
