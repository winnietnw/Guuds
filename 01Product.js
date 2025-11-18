document.addEventListener('DOMContentLoaded', () => {

    const minusBtn = document.getElementById('qtyMinus');
    const plusBtn = document.getElementById('qtyPlus');
    const qtyDisplay = document.getElementById('qtyNumber');

    let qty = parseInt(qtyDisplay.textContent) || 1;
    const MIN = 1;
    const MAX = 999;

    function updateQty() {
        qtyDisplay.textContent = qty;
    }

    minusBtn.addEventListener("click", () => {
        if (qty > MIN) {
            qty--;
            updateQty();
        }
    });

    plusBtn.addEventListener("click", () => {
        if (qty < MAX) {
            qty++;
            updateQty();
        }
    });

    updateQty();
});