// 📚 Lấy số chương
function getChap() {
  const match = window.location.pathname.match(/chap(\d+)\.html/);
  return match ? parseInt(match[1]) : 1;
}

// ⬅️➡️ NAV
function nextChap() {
  let c = getChap();
  window.location.href = `chap${c + 1}.html`;
}

function prevChap() {
  let c = getChap();
  if (c > 1) window.location.href = `chap${c - 1}.html`;
}

// 🏠 HOME
function goHome() {
  window.location.href = "../index.html";
}

// 🌙 DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
}

// LOAD DARK
if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}

// 🔠 FONT SIZE
let size = localStorage.getItem("font") || 18;

function applyFont() {
  document.getElementById("content").style.fontSize = size + "px";
}

function increaseFont() {
  size++;
  localStorage.setItem("font", size);
  applyFont();
}

function decreaseFont() {
  size--;
  localStorage.setItem("font", size);
  applyFont();
}

applyFont();

// 💾 SAVE CHAPTER
localStorage.setItem("lastChap", window.location.href);

// 📱 SWIPE (mobile)
let startY = 0;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  let endY = e.changedTouches[0].clientY;

  if (startY - endY > 50) nextChap();   // swipe up
  if (endY - startY > 50) prevChap();   // swipe down
});

// ⚡ PRELOAD NEXT
(function preload() {
  let c = getChap();
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = `chap${c + 1}.html`;
  document.head.appendChild(link);
})();