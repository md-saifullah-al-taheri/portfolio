/* =========================================
   PORTFOLIO — main.js
   Shared JS for all pages
   ========================================= */

// ── Navigation ────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks   = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  }));
}

// ── Active nav link ────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Scroll reveal ──────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .stagger').forEach(el => revealObserver.observe(el));

// ── Nav scroll state ───────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.borderBottomColor = window.scrollY > 50
      ? 'rgba(200,169,110,0.2)'
      : 'rgba(200,169,110,0.1)';
  }
}, { passive: true });

// ── Typewriter effect ──────────────────────
function typewriter(element, texts, speed = 80, pause = 2000) {
  if (!element) return;
  let textIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const currentText = texts[textIndex];
    element.textContent = isDeleting
      ? currentText.substring(0, charIndex - 1)
      : currentText.substring(0, charIndex + 1);

    isDeleting ? charIndex-- : charIndex++;

    let delay = speed;
    if (!isDeleting && charIndex === currentText.length) {
      delay = pause;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

// ── Smooth count-up ────────────────────────
function countUp(element, target, duration = 1500) {
  if (!element) return;
  let start = 0;
  const step = target / (duration / 16);
  const update = () => {
    start = Math.min(start + step, target);
    element.textContent = Math.floor(start).toLocaleString();
    if (start < target) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Trigger count-ups when visible
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      if (!isNaN(target)) countUp(el, target);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// Init typewriter on homepage
const typeTarget = document.getElementById('typewriter-text');
if (typeTarget) {
  typewriter(typeTarget, [
    'Economics Graduate',
    'Research Analyst',
    'Data Scientist',
    'Graphic Designer',
    'Web Developer',
    'Content Writer'
  ]);
}
