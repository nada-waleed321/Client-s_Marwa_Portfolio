/* ============================================================
   MARWA IBRAHIM — PORTFOLIO SCRIPT
   ============================================================ */

'use strict';

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Hamburger / mobile overlay ────────────────────────────────
const hamburger     = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const closeBtn      = document.getElementById('closeBtn');
const mobLinks      = document.querySelectorAll('.mob-link');

function openMenu() {
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
mobLinks.forEach(link => link.addEventListener('click', closeMenu));

// Close on overlay background click
mobileOverlay.addEventListener('click', e => {
  if (e.target === mobileOverlay) closeMenu();
});

// ── Scroll-reveal (IntersectionObserver) ──────────────────────
const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-delay]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ─────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth scroll for all anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Subtle parallax on hero background shape ──────────────────
const heroBgShape = document.querySelector('.hero-bg-shape');
if (heroBgShape && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBgShape.style.transform = `translateY(${y * 0.18}px)`;
  }, { passive: true });
}

// ── Chip hover colour rotation (subtle delight) ───────────────
const chips = document.querySelectorAll('.chip');
const chipColors = ['#1d6a72', '#2a8f9a', '#c9a84c', '#2d7a6a', '#6a5acd'];
chips.forEach((chip, i) => {
  chip.addEventListener('mouseenter', () => {
    chip.style.background = chipColors[i % chipColors.length];
    chip.style.color = '#fff';
    chip.style.borderColor = 'transparent';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.background = '';
    chip.style.color = '';
    chip.style.borderColor = '';
  });
});

// ── Contact card ripple effect ────────────────────────────────
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all .25s cubic-bezier(.25,.46,.45,.94)';
  });
});

console.log('%c👋 Hey there! Built with care for Marwa Ibrahim.', 'color:#1d6a72;font-weight:bold;font-size:14px;');
