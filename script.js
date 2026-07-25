// ---- Photo slideshow ("spolu") ----
const slides = document.querySelectorAll('.slide');
const counterPill = document.getElementById('counter-pill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const total = slides.length;

let current = 0;
let timer = null;

function render() {
  slides.forEach((s, i) => s.classList.toggle('active', i === current));
  counterPill.textContent = `${String(current + 1).padStart(2, '0')} / ${total}`;
}

function goTo(index) {
  current = ((index % total) + total) % total;
  render();
}

function startAutoplay() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), 4500);
}

prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });

render();
startAutoplay();
