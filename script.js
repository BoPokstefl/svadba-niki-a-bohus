// ---- Countdown to the big day ----
const WEDDING_DATE = new Date('2026-09-26T17:00:00');

function updateCountdown() {
  const now = new Date();
  let diff = WEDDING_DATE - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById('cd-days').textContent = days;
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---- Dynamic photo slideshow ----
// Reads whatever images are in /images/slideshow directly from this GitHub repo,
// so new photos show up automatically after being uploaded via the GitHub website.
const REPO_OWNER = 'BoPokstefl';
const REPO_NAME = 'svadba-niki-a-bohus';
const SLIDESHOW_PATH = 'images/slideshow';
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;
const CACHE_KEY = 'slideshow-cache-v1';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function fetchSlideshowImages() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.ts < CACHE_TTL) return parsed.urls;
    }
  } catch (e) { /* ignore cache errors */ }

  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${SLIDESHOW_PATH}`;
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error('Nepodarilo sa načítať fotky');
  const files = await res.json();

  const urls = files
    .filter(f => f.type === 'file' && IMAGE_EXT.test(f.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(f => f.download_url);

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), urls }));
  } catch (e) { /* ignore cache errors */ }

  return urls;
}

function buildSlideshow(urls) {
  const track = document.getElementById('slideshow-track');
  const dotsWrap = document.getElementById('slide-dots');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  track.innerHTML = '';
  dotsWrap.innerHTML = '';

  urls.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Svadobná fotka ${i + 1}`;
    img.loading = 'lazy';
    slide.appendChild(img);
    track.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  if (urls.length > 1) {
    prevBtn.hidden = false;
    nextBtn.hidden = false;
  }

  let current = 0;
  const slides = () => track.querySelectorAll('.slide');
  const dots = () => dotsWrap.querySelectorAll('.dot');

  function goToSlide(index) {
    const total = slides().length;
    current = (index + total) % total;
    slides().forEach((s, i) => s.classList.toggle('active', i === current));
    dots().forEach((d, i) => d.classList.toggle('active', i === current));
  }
  window.goToSlide = goToSlide;

  prevBtn.addEventListener('click', () => goToSlide(current - 1));
  nextBtn.addEventListener('click', () => goToSlide(current + 1));

  if (urls.length > 1) {
    setInterval(() => goToSlide(current + 1), 4000);
  }
}

function goToSlide(index) {
  // placeholder until buildSlideshow defines the real one via window.goToSlide
  if (window.goToSlide) window.goToSlide(index);
}

fetchSlideshowImages()
  .then(urls => {
    if (urls.length > 0) buildSlideshow(urls);
  })
  .catch(() => {
    // Keep the "photos coming soon" placeholder already in the HTML
  });
