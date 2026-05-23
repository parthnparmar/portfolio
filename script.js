// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.top = window.scrollY > 50 ? '10px' : '20px';
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
}

// ─── AOS ──────────────────────────────────────────────────────────────────────
function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => el.classList.add('aos-animate'), parseInt(el.getAttribute('data-aos-delay') || 0));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; this.reset(); }, 3000);
});

// ─── SMOOTH SCROLL ────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── VIDEO PLAY / PAUSE ───────────────────────────────────────────────────────
function initVideoPlayers() {
  document.querySelectorAll('.showcase-video-wrap').forEach(wrap => {
    const video = wrap.querySelector('.showcase-video');
    const btn   = wrap.querySelector('.play-btn');
    if (!video || !btn) return;

    // Click play button
    btn.addEventListener('click', () => {
      if (video.paused) {
        // Pause all other videos first
        document.querySelectorAll('.showcase-video').forEach(v => {
          if (v !== video) {
            v.pause();
            const ob = v.closest('.showcase-video-wrap').querySelector('.play-btn');
            if (ob) ob.classList.remove('playing');
            v.closest('.showcase-video-wrap').querySelector('.showcase-video-overlay').style.opacity = '1';
          }
        });
        video.play();
        btn.classList.add('playing');
        btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        wrap.querySelector('.showcase-video-overlay').style.opacity = '0';
      } else {
        video.pause();
        btn.classList.remove('playing');
        btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        wrap.querySelector('.showcase-video-overlay').style.opacity = '1';
      }
    });

    // Reset on video end
    video.addEventListener('ended', () => {
      btn.classList.remove('playing');
      btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      wrap.querySelector('.showcase-video-overlay').style.opacity = '1';
    });
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  updateActiveNav();
  initVideoPlayers();
});
