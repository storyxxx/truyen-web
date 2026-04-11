function getChap() {
  const match = window.location.pathname.match(/chap(\d+)\.html/);
  return match ? parseInt(match[1]) : 1;
}

function nextChap() {
  let c = getChap();
  window.location.href = `chap${c + 1}.html`;
}

function prevChap() {
  let c = getChap();
  if (c > 1) window.location.href = `chap${c - 1}.html`;
}

function goHome() {
  window.location.href = "../../index.html";
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

// FONT
let size = localStorage.getItem("font") || 18;

function applyFont() {
  const el = document.getElementById("content");
  if (el) el.style.fontSize = size + "px";
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

// SAVE
localStorage.setItem("lastChap", window.location.href);

// SWIPE
let startY = 0;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  let endY = e.changedTouches[0].clientY;

  if (startY - endY > 50) nextChap();
  if (endY - startY > 50) prevChap();
});
