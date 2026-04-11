// 🌙 DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}

// 🔍 SEARCH REALTIME
document.getElementById("search").addEventListener("input", function() {
  const keyword = this.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.dataset.title;
    card.style.display = title.includes(keyword) ? "flex" : "none";
  });
});

// ⚡ LOAD PAGE KHÔNG RELOAD
function loadPage(url) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const content = doc.querySelector(".card") || doc.body;

      document.getElementById("app").innerHTML = content.innerHTML;

      window.scrollTo(0, 0);
    });
}
