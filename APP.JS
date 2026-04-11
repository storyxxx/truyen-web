// 🌙 DARK
function toggleDark() {
  document.body.classList.toggle("dark");
}

// 🔍 SEARCH
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(keyword) ? "flex" : "none";
    });
  });
}

// 🎯 FILTER TAG
function filterTag(tag) {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const tags = card.dataset.tag || "";

    if (tag === "all" || tags.includes(tag)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
