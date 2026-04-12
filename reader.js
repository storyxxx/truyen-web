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
let startX = 0;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endY = e.changedTouches[0].clientY;
  let endX = e.changedTouches[0].clientX;

  let diffY = startY - endY;
  let diffX = Math.abs(startX - endX);

  // chỉ trigger nếu vuốt mạnh + không phải scroll ngang
  if (Math.abs(diffY) > 100 && diffX < 50) {
    if (diffY > 0) nextChap();
    else prevChap();
  }
});
