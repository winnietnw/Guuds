let users = [
    {
        username: "User Name",
        role: "User",
        status: "Active",
        comm: "Test",
        date: "10-10-2024",
        name: "Test",
        email: "test@mail.com",
        address: "Test address"
    }
];

let editIndex = null;
let deleteIndex = null;

function loadTable() {
    const body = document.getElementById("userBody");
    body.innerHTML = "";

    users.forEach((u, i) => {
        body.innerHTML += `
        <tr>
            <td>${u.username}</td>
            <td>${u.role}</td>
            <td>${u.status}</td>
            <td>${u.comm}</td>
            <td>${u.date}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.address}</td>
            <td class="action-icons">
                <i class="material-icons" onclick="openEdit(${i})">edit</i>
                <i class="material-icons" style="color:red" onclick="openDeletePopup(${i})">delete</i>
            </td>
        </tr>`;
    });

    updateCounts();
}

function updateCounts() {
    document.getElementById("totalUser").innerText = users.length;
    document.getElementById("activeUser").innerText = users.filter(u => u.status === "Active").length;
    document.getElementById("publisherStores").innerText = users.filter(u => u.role === "Publisher").length;
}


function openAddPopup() {
    document.getElementById("popupAdd").style.display = "flex";
}

function closeAdd() {
    document.getElementById("popupAdd").style.display = "none";
}

function saveUser() {
    const newUser = {
        username: document.getElementById("add_username").value,
        email: document.getElementById("add_email").value,
        role: document.getElementById("add_type").value,
        status: document.getElementById("add_status").value,
        comm: document.getElementById("add_comm").value,
        date: "01-02-2025",
        name: document.getElementById("add_username").value,
        address: "—"
    };

    users.push(newUser);

    closeAdd();
    loadTable();
    openSuccess();
}


function openEdit(i) {
    editIndex = i;

    const u = users[i];

    document.getElementById("edit_username").value = u.username;
    document.getElementById("edit_email").value = u.email;
    document.getElementById("edit_type").value = u.role;
    document.getElementById("edit_status").value = u.status;
    document.getElementById("edit_comm").value = u.comm;

    document.getElementById("popupEdit").style.display = "flex";
}

function closeEdit() {
    document.getElementById("popupEdit").style.display = "none";
}

function saveEdit() {
    const u = users[editIndex];

    u.username = document.getElementById("edit_username").value;
    u.email = document.getElementById("edit_email").value;
    u.role = document.getElementById("edit_type").value;
    u.status = document.getElementById("edit_status").value;
    u.comm = document.getElementById("edit_comm").value;

    closeEdit();
    loadTable();
}

function openDeletePopup(index) {
    deleteIndex = index;
    document.getElementById("popupDelete").style.display = "flex";
}

function closeDelete() {
    document.getElementById("popupDelete").style.display = "none";
}

function confirmDelete() {
    if (deleteIndex !== null) {
        users.splice(deleteIndex, 1);
        loadTable();
        updateCounts();
    }

    closeDelete();
}

function openSuccess() {
    document.getElementById("popupSuccess").style.display = "flex";
}

function closeSuccess() {
    document.getElementById("popupSuccess").style.display = "none";
}

loadTable();