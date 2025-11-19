let products = [];
let editIndex = null;
let deleteIndex = null;

function renderTable() {
    const body = document.getElementById("productBody");
    body.innerHTML = "";

    products.forEach((p, i) => {
        body.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.artist}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td>${p.status}</td>
            <td>${p.seller}</td>
            <td>${p.date}</td>
            <td class="action-icons">
                <i class="material-icons" onclick="openEditProduct(${i})">edit</i>
                <i class="material-icons delete-icon" onclick="openDeleteProduct(${i})">delete</i>
            </td>
        </tr>`;
    });
}

/* ADD PRODUCT */
function openAddProduct() {
    document.getElementById("popupAddProduct").style.display = "flex";
}

function closeAddProduct() {
    document.getElementById("popupAddProduct").style.display = "none";
}

function saveProduct() {
    products.push({
        name: document.getElementById("add_pname").value,
        artist: document.getElementById("add_artist").value,
        category: document.getElementById("add_category").value,
        price: document.getElementById("add_price").value,
        stock: document.getElementById("add_stock").value,
        status: document.getElementById("add_status").value,
        sellerType: document.getElementById("add_sellerType").value,
        seller: document.getElementById("add_seller").value,
        desc: document.getElementById("add_desc").value,
        date: "2025-02-01"
    });

    closeAddProduct();
    renderTable();
    openSuccessProduct();
}

/* EDIT PRODUCT */
function openEditProduct(i) {
    editIndex = i;

    const p = products[i];

    document.getElementById("edit_pname").value = p.name;
    document.getElementById("edit_artist").value = p.artist;
    document.getElementById("edit_category").value = p.category;
    document.getElementById("edit_price").value = p.price;
    document.getElementById("edit_stock").value = p.stock;
    document.getElementById("edit_status").value = p.status;
    document.getElementById("edit_sellerType").value = p.sellerType;
    document.getElementById("edit_seller").value = p.seller;
    document.getElementById("edit_desc").value = p.desc;

    document.getElementById("popupEditProduct").style.display = "flex";
}

function closeEditProduct() {
    document.getElementById("popupEditProduct").style.display = "none";
}

function saveEditProduct() {
    const p = products[editIndex];

    p.name = document.getElementById("edit_pname").value;
    p.artist = document.getElementById("edit_artist").value;
    p.category = document.getElementById("edit_category").value;
    p.price = document.getElementById("edit_price").value;
    p.stock = document.getElementById("edit_stock").value;
    p.status = document.getElementById("edit_status").value;
    p.sellerType = document.getElementById("edit_sellerType").value;
    p.seller = document.getElementById("edit_seller").value;
    p.desc = document.getElementById("edit_desc").value;

    closeEditProduct();
    renderTable();
}

/* DELETE PRODUCT */
function openDeleteProduct(i) {
    deleteIndex = i;
    document.getElementById("popupDeleteProduct").style.display = "flex";
}

function closeDeleteProduct() {
    document.getElementById("popupDeleteProduct").style.display = "none";
}

function confirmDeleteProduct() {
    products.splice(deleteIndex, 1);
    closeDeleteProduct();
    renderTable();
}

/* SUCCESS POPUP */
function openSuccessProduct() {
    document.getElementById("popupSuccessProduct").style.display = "flex";
}

function closeSuccessProduct() {
    document.getElementById("popupSuccessProduct").style.display = "none";
}

renderTable();