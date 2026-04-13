// ================= DATA =================
let currentPage = 1;
const perPage = 6;

let filteredStories = [...stories];

// ================= RENDER =================
function renderStories() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  let start = (currentPage - 1) * perPage;
  let end = start + perPage;

  let pageItems = filteredStories.slice(start, end);

  pageItems.forEach(story => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${story.img}">
      <div>
        <h2>
          <a href="${story.link}">
            ${story.title}
          </a>
        </h2>
        <p>${story.desc}</p>
      </div>
    `;

    app.appendChild(card);
  });

  renderPagination();
}

// ================= PAGINATION =================
function renderPagination() {
  const totalPages = Math.ceil(filteredStories.length / perPage);
  const container = document.getElementById("pagination");

  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      currentPage = i;
      renderStories();
    };

    container.appendChild(btn);
  }
}

// ================= SEARCH =================
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  filteredStories = stories.filter(s =>
    s.title.toLowerCase().includes(keyword)
  );

  currentPage = 1;
  renderStories();
});

// ================= FILTER TAG =================
function filterTag(tag) {
  if (tag === "all") {
    filteredStories = [...stories];
  } else {
    filteredStories = stories.filter(s =>
      s.tags.includes(tag)
    );
  }

  currentPage = 1;
  renderStories();
}

// ================= DARK MODE =================
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ================= INIT =================
renderStories();
