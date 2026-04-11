// 🌙 DARK
function toggleDark() {
  document.body.classList.toggle("dark");
}

// 🔍 SEARCH
document.getElementById("search").addEventListener("input", function() {
  const keyword = this.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(keyword)
      ? "flex" : "none";
  });
});

// 👉 ĐI VÀO TRUYỆN
function goToStory() {
  window.location.href = "chapters/chap1.html";
}
function filterTag(tag) {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const tags = card.dataset.tag;

    if (tag === "all" || tags.includes(tag)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
