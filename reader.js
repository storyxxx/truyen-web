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

// SWIPE (FIX LỖI NHẢY CHƯƠNG KHI SCROLL)
let startY = 0;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  let endY = e.changedTouches[0].clientY;

  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight;
  const clientHeight = window.innerHeight;

  // 👉 Vuốt lên → NEXT (chỉ khi ở cuối trang)
  if (startY - endY > 80 && scrollTop + clientHeight >= scrollHeight - 10) {
    nextChap();
  }

  // 👉 Vuốt xuống → PREV (chỉ khi ở đầu trang)
  if (endY - startY > 80 && scrollTop <= 10) {
    prevChap();
  }
});

  if (startY - endY > 50) nextChap();
  if (endY - startY > 50) prevChap();
});
