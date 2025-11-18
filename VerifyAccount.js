const form = document.querySelector(".verify-form");
const popup = document.getElementById("store-popup");

form.addEventListener("submit", function(e) {
    e.preventDefault();        // กันไม่ให้รีเฟรชหน้า
    popup.style.display = "flex"; // เปิด popup
});

function closePopup() {
    popup.style.display = "none";

    // ไปหน้าโปรไฟล์หลังจาก verify เรียบร้อย
    window.location.href = "UserProfile-Unverify.html";
}