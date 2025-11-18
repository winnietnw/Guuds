const posts = [
  {
    user: "ARMYTrader123",
    comm: "ARMYs",
    time: "2 hours ago",
    label: "Looking for",
    title: "Looking for BTS Jungkook Seven Photocard",
    price: 20,
    likes: 15,
    comments: 7
  },
  {
    user: "UAENA516",
    comm: "UAENAs",
    time: "6 hours ago",
    label: "Want to sell",
    title: "Selling IU 5th Album LILAC (Sealed)",
    price: 20,
    likes: 10,
    comments: 5
  },
  {
    user: "OnceForever",
    comm: "ONCEs",
    time: "6 hours ago",
    label: "",
    title: "Selling TWICE Fanmade Poster",
    price: 3.5,
    likes: 3,
    comments: 1
  }
];

function renderPosts() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach((p, index) => {
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

        <span class="like-btn" data-index="${index}">
          ❤️ <span class="like-count">${p.likes}</span>
        </span>

        <span>💬 ${p.comments}</span>
      </div>
    `;

    container.appendChild(card);
  });
}



document.addEventListener("click", function (e) {
  const btn = e.target.closest(".like-btn");
  if (!btn) return;

  const i = btn.dataset.index;
  const countEl = btn.querySelector(".like-count");

  if (!posts[i].liked) {
    posts[i].liked = true;
    posts[i].likes++;
    btn.style.color = "#ff2d75";
  } else {
    posts[i].liked = false;
    posts[i].likes--;
    btn.style.color = "black";
  }

  countEl.textContent = posts[i].likes;
});

document.addEventListener("DOMContentLoaded", renderPosts);
