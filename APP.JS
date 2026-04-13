function initApp() {
  if (typeof stories === "undefined") {
    console.log("⏳ đợi data...");
    setTimeout(initApp, 100);
    return;
  }

  console.log("✅ data loaded");

  let currentPage = 1;
  const perPage = 6;
  let filteredStories = [...stories];

  function renderStories() {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = "";

    let start = (currentPage - 1) * perPage;
    let end = start + perPage;

    let pageItems = filteredStories.slice(start, end);

    if (pageItems.length === 0) {
      app.innerHTML = "<p style='padding:20px'>❌ Không có truyện</p>";
      return;
    }

    pageItems.forEach(story => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${story.img}">
        <div>
          <h2><a href="${story.link}">${story.title}</a></h2>
          <p>${story.desc}</p>
        </div>
      `;

      app.appendChild(card);
    });

    renderPagination();
  }

  function renderPagination() {
    const container = document.getElementById("pagination");
    if (!container) return;

    const totalPages = Math.ceil(filteredStories.length / perPage);
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;

      if (i === currentPage) btn.classList.add("active");

      btn.onclick = () => {
        currentPage = i;
        renderStories();
      };

      container.appendChild(btn);
    }
  }

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase();

      filteredStories = stories.filter(s =>
        s.title.toLowerCase().includes(keyword)
      );

      currentPage = 1;
      renderStories();
    });
  }

  window.filterTag = function(tag) {
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

  window.toggleDark = function() {
    document.body.classList.toggle("dark");
  }

  renderStories();
}

// 🚀 chạy
initApp();
