document.addEventListener("DOMContentLoaded", () => {
    const minusBtn = document.getElementById("minus");
    const plusBtn = document.getElementById("plus");
    const qtyText = document.getElementById("qty");

    let qty = 1;

    minusBtn.addEventListener("click", () => {
        if (qty > 1) qty--;
        qtyText.textContent = qty;
    });

    plusBtn.addEventListener("click", () => {
        qty++;
        qtyText.textContent = qty;
    });
});
