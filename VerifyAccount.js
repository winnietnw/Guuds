const form = document.querySelector(".verify-form");
const popup = document.getElementById("store-popup");

form.addEventListener("submit", function(e) {
    e.preventDefault();      
    popup.style.display = "flex"; 
});

function closePopup() {
    popup.style.display = "none";

    
    window.location.href = "UserProfile-Unverify.html";
}