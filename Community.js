const posts = [
  {
    user: "ARMYTrader123",
    comm: "ARMYs",
    time: "2 hours ago",
    label: "Looking for",
    title: "Looking for BTS Jungkook Seven Photocard",
    price: 20
  },
  {
    user: "UAENA516",
    comm: "UAENAs",
    time: "6 hours ago",
    label: "Want to sell",
    title: "Selling IU 5th Album LILAC (Sealed)",
    price: 20
  },
  {
    user: "OnceForever",
    comm: "ONCEs",
    time: "6 hours ago",
    label: "",
    title: "Selling TWICE Fanmade Poster",
    price: 3.5
  }
];

const myComms = [
  {name:"ARMYs", members:"20.5k"},
  {name:"ONCEs", members:"19k"},
  {name:"UAENAs", members:"13.8k"},
  {name:"BLINKs", members:"26.2k"},
];

function renderPosts() {
  const container = document.getElementById("posts");
  posts.forEach(p => {
    const card = document.createElement("div");
    card.className = "post";
    card.innerHTML = `
      <div class="post-header">
        <div>
          <strong>${p.user}</strong>
          <span style="color:#6b7280; margin-left:8px">${p.time}</span>
        </div>
        <span style="color:#8b5cf6; font-weight:700">★</span>
      </div>

      <div class="user-meta" style="margin-top:6px">
        <span class="tag">${p.comm}</span>
      </div>

      <div style="margin-top:12px; font-weight:700">${p.title}</div>

      <div class="post-images">
        <div></div><div></div><div></div>
      </div>

      <div class="post-footer">
        <span style="color:#6d00b5; font-weight:700">$${p.price}</span>
        <span>♡ 15</span>
        <span>↩ 7</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderSidebar() {
  const list = document.getElementById("my-comm-list");
  myComms.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${c.name}</strong>
      <div style="color:#6b7280; font-size:14px">${c.members} members</div>
    `;
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
  renderSidebar();
});

document.addEventListener("click", function(e) {
  if (e.target.closest(".like-btn")) {
    const btn = e.target.closest(".like-btn");
    const countEl = btn.querySelector(".like-count");
    let count = parseInt(countEl.textContent);

    if (btn.dataset.liked === "false") {
      countEl.textContent = count + 1;
      btn.dataset.liked = "true";
      btn.style.color = "#ff2d75"; // สีชมพูไลก์
    } else {
      countEl.textContent = count - 1;
      btn.dataset.liked = "false";
      btn.style.color = "#000"; // กลับสีปกติ
    }
  }
});

