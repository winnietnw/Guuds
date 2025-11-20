const API = "http://localhost:3000/api/users";

let users = [];
let editIndex = null;
let deleteIndex = null;

async function loadTableFromServer() {
    try {
        const res = await fetch(API);
        users = await res.json();
        renderTable(users);
        updateCounts(users);
    } catch (err) {
        console.error(err);
    }
}

function renderTable(list) {
    const body = document.getElementById("userBody");
    body.innerHTML = "";

    list.forEach((u, i) => {
        const displayID = i + 1;

        const first = u.firstName || u.UserFname || "";
        const last = u.lastName || u.UserLname || "";
        const name = (first + " " + last).trim();
        const username = u.username || u.Username || "";
        const role = u.role || u.Role || "User";
        const active = (u.active !== undefined) ? u.active : (u.UserS_Active ? true : false);
        const email = u.email || u.UserEmail || "";
        const regDateRaw = u.registerDate || u.UserRegisterDate;
        const regDate = regDateRaw ? new Date(regDateRaw).toLocaleDateString() : "";
        const address = u.address
            ? `${u.address.street || ""} ${u.address.city || ""}`
            : `${u.UserA_Street || ""} ${u.UserA_City || ""}`.trim();

        body.innerHTML += `
      <tr>
        <td>${displayID}</td>   <!-- 🔥 เพิ่มลำดับแสดงหน้าเว็บ -->
        <td>${username}</td>
        <td>${role}</td>
        <td>${active ? "Active" : "Inactive"}</td>
        <td>${u.communities || ""}</td>
        <td>${regDate}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${address}</td>
        <td class="action-icons">
          <i class="material-icons" onclick="openEdit(${i})">edit</i>
          <i class="material-icons" style="color:red" onclick="openDeletePopup(${i})">delete</i>
        </td>
      </tr>`;
    });
}

function updateCounts(list = users) {
    document.getElementById("totalUser").innerText = list.length;

    const activeUser = list.filter(u => {
        if (u.active !== undefined) return u.active;
        return u.UserS_Active ? true : false;
    }).length;
    document.getElementById("activeUser").innerText = activeUser;

    document.getElementById("publisherStores").innerText =
        list.filter(u => (u.role || u.Role || "").toLowerCase() === "publisher").length;
}

function setupSearch() {
    const box = document.getElementById("searchBox");
    box.addEventListener("input", e => {
        const q = e.target.value.toLowerCase();
        if (!q) {
            renderTable(users);
            updateCounts(users);
            return;
        }

        const filtered = users.filter(u => {
            const username = (u.username || u.Username || "").toLowerCase();
            const email = (u.email || u.UserEmail || "").toLowerCase();
            const name = ((u.firstName || u.UserFname || "") + " " + (u.lastName || u.UserLname || "")).toLowerCase();
            return username.includes(q) || email.includes(q) || name.includes(q);
        });

        renderTable(filtered);
        updateCounts(filtered);
    });
}

async function saveUser() {
    const username = document.getElementById("add_username").value.trim();
    const email = document.getElementById("add_email").value.trim();
    const role = document.getElementById("add_type").value;
    const status = document.getElementById("add_status").value;

    if (!username || !email) return;

    const payload = {
        Username: username,
        UserFname: "",
        UserLname: "",
        UserEmail: email,
        UserPhoneNumber: "",
        UserPassword: "123456",
        UserA_Street: "",
        UserA_City: "",
        UserA_Province: "",
        UserA_Country: "",
        UserA_PostalCode: "",
        UserDOB: null,
        UserS_Active: status === "Active" ? 1 : 0,
        UserS_Suspended: 0
    };

    try {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        closeAdd();
        await loadTableFromServer();
        openSuccess();
    } catch (err) {
        console.error(err);
    }
}

function openAddPopup() {
    document.getElementById("popupAdd").style.display = "flex";
}

function closeAdd() {
    document.getElementById("popupAdd").style.display = "none";
}

function openEdit(i) {
    editIndex = i;
    const u = users[i];

    document.getElementById("edit_username").value = u.username || u.Username;
    document.getElementById("edit_email").value = u.email || u.UserEmail;
    document.getElementById("edit_type").value = u.role || u.Role;
    document.getElementById("edit_status").value = (u.active || u.UserS_Active) ? "Active" : "Inactive";
    document.getElementById("edit_comm").value = u.communities || "";

    document.getElementById("popupEdit").style.display = "flex";
}

function closeEdit() {
    document.getElementById("popupEdit").style.display = "none";
}

async function saveEdit() {
    const u = users[editIndex];
    const id = u.UserID || u.id;

    const payload = {
        Username: document.getElementById("edit_username").value,
        UserEmail: document.getElementById("edit_email").value,
        UserS_Active: document.getElementById("edit_status").value === "Active" ? 1 : 0
    };

    try {
        await fetch(`${API}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        closeEdit();
        await loadTableFromServer();
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setupSearch();
    loadTableFromServer();
    document.querySelector("#popupAdd .add-btn").addEventListener("click", saveUser);
});

function openDeletePopup(index) {
    deleteIndex = index;
    document.getElementById("popupDelete").style.display = "flex";
}

function closeDelete() {
    document.getElementById("popupDelete").style.display = "none";
}

async function confirmDelete() {
    const u = users[deleteIndex];
    const id = u.UserID || u.id;

    try {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        closeDelete();
        await loadTableFromServer();
    } catch (err) {
        console.error(err);
    }
}

function openSuccess() {
    document.getElementById("popupSuccess").style.display = "flex";
}

function closeSuccess() {
    document.getElementById("popupSuccess").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    setupSearch();
    loadTableFromServer();
    document.querySelector("#popupAdd .add-btn").addEventListener("click", saveUser);
    document.querySelector("#popupEdit .add-btn").addEventListener("click", saveEdit);
});
