// ===================== GLOBAL =====================

// gắn vào window để HTML gọi được
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

// 👉 sửa số này theo truyện
function getMaxChap() {
  return 50; // ví dụ 50 chương
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
  window.location.href = "/truyen-web/index.html";
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

// ===================== SWIPE FIX (QUAN TRỌNG NHẤT) =====================

let startY = 0;
let startTime = 0;
let isScrolling = false;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
  startTime = Date.now();
  isScrolling = false;
});

document.addEventListener("touchmove", () => {
  isScrolling = true; // đang scroll thật
});

document.addEventListener("touchend", e => {
  let endY = e.changedTouches[0].clientY;
  let diffY = startY - endY;
  let duration = Date.now() - startTime;

  // ❌ nếu là scroll thì bỏ
  if (isScrolling) return;

  // ❌ nếu vuốt chậm (scroll) thì bỏ
  if (duration > 300) return;

  // ❌ nếu vuốt nhẹ thì bỏ
  if (Math.abs(diffY) < 150) return;

  // ✅ chỉ swipe nhanh + mạnh mới chuyển chap
  if (diffY > 0) {
    nextChap();
  } else {
    prevChap();
  }
});
