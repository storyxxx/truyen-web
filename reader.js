window.nextChap = nextChap;
window.prevChap = prevChap;
window.goHome = goHome;
window.toggleDark = toggleDark;
window.increaseFont = increaseFont;
window.decreaseFont = decreaseFont;

// ===================== CHAP NAVIGATION FIX =====================

function getChap() {
  const match = window.location.pathname.match(/chap(\d+)\.html/);
  return match ? parseInt(match[1]) : 1;
}

// 👉 FIX: giới hạn tối đa chapter (QUAN TRỌNG)
function getMaxChap() {
  // bạn sửa số này theo tổng chương truyện
  return 4;
}

function nextChap() {
  let c = getChap();

  if (c < getMaxChap()) {
    window.location.href = `chap${c + 1}.html`;
  } else {
    // đang ở chap cuối → không cho lỗi
    console.log("Đã ở chương cuối");
  }
}

function prevChap() {
  let c = getChap();

  if (c > 1) {
    window.location.href = `chap${c - 1}.html`;
  } else {
    console.log("Đã ở chương đầu");
  }
}

// ===================== HOME =====================

function goHome() {
  window.location.href = "../../index.html";
}

// ===================== DARK MODE =====================

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

// ===================== SAVE LAST CHAPTER =====================

localStorage.setItem("lastChap", window.location.href);

// ===================== SWIPE FIX =====================

let startY = 0;
let isScrolling = false;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
  isScrolling = false;
});

document.addEventListener("touchmove", () => {
  isScrolling = true; // đang scroll thật
});

document.addEventListener("touchend", e => {
  if (isScrolling) return; // ❌ nếu là scroll thì bỏ

  let endY = e.changedTouches[0].clientY;
  let diff = startY - endY;

  if (Math.abs(diff) > 150) {
    if (diff > 0) nextChap();
    else prevChap();
  }
});
