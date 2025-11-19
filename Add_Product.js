document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("addProductForm");
    const modal = document.getElementById("successModal");
    const closeModalButton = document.getElementById("closeModal");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        modal.classList.add("open");
    });

    closeModalButton.addEventListener("click", () => {
        modal.classList.remove("open");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("open");
        }
    });

});
