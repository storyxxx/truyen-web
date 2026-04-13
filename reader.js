// ===================== GLOBAL =====================
window.nextChap = nextChap;
window.prevChap = prevChap;
window.goHome = goHome;
window.toggleDark = toggleDark;
window.increaseFont = increaseFont;
window.decreaseFont = decreaseFont;

// ===================== CHAPTER =====================
function getChap() {
  const match = window.location.pathname.match(/chap(\d+)\.html/);
  return match ? parseInt(match[1]) : 1;
}

function getMaxChap() {
  return 50; // chỉnh theo truyện của bạn
}

function nextChap() {
  let c = getChap();
  if (c < getMaxChap()) {
    window.location.href = `chap${c + 1}.html`;
  }
}

function prevChap() {
  let c = getChap();
  if (c > 1) {
    window.location.href = `chap${c - 1}.html`;
  }
}

// ===================== HOME =====================
function goHome() {
  window.location.href = "../../index.html";
}

// ===================== DARK =====================
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ===================== FONT =====================
let size = parseInt(localStorage.getItem("font")) || 18;

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

// ===================== SAVE =====================
localStorage.setItem("lastChap", window.location.href);

// ===================== SWIPE FIX =====================
let startY = 0;
let startTime = 0;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
  startTime = Date.now();
});

document.addEventListener("touchend", e => {
  let endY = e.changedTouches[0].clientY;
  let diffY = startY - endY;
  let duration = Date.now() - startTime;

  // chỉ vuốt NHANH + MẠNH mới chuyển chap
  if (duration < 200 && Math.abs(diffY) > 200) {
    if (diffY > 0) nextChap();
    else prevChap();
  }
});
