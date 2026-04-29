/* ============================================
   script.js — Purushothama Portfolio
   All JavaScript for the portfolio website
   ============================================ */


/* ──────────────────────────────────────────
   1. CUSTOM CURSOR
   Follows the mouse and grows on hover
   ────────────────────────────────────────── */
const cursor = document.getElementById('cursor');

// Move cursor dot to mouse position
document.addEventListener('mousemove', function(e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// Make cursor larger when hovering links, buttons, cards
document.querySelectorAll('a, button, .project-row, .skill-card').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.classList.add('big');
  });
  el.addEventListener('mouseleave', function() {
    cursor.classList.remove('big');
  });
});


/* ──────────────────────────────────────────
   2. MOBILE NAV TOGGLE (Hamburger Menu)
   Opens/closes the nav on small screens
   ────────────────────────────────────────── */
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle open class when hamburger is clicked
toggle.addEventListener('click', function() {
  navLinks.classList.toggle('open');
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
  });
});


/* ──────────────────────────────────────────
   3. SCROLL REVEAL ANIMATION
   Fades elements up when they enter viewport
   ────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

// IntersectionObserver watches when elements become visible
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // Add visible class → CSS transition plays
      entry.target.classList.add('visible');
      // Stop watching once revealed
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });  // trigger when 12% of element is visible

// Watch all .reveal elements
reveals.forEach(function(el) {
  observer.observe(el);
});


/* ──────────────────────────────────────────
   4. ACTIVE NAV LINK ON SCROLL
   Highlights current section in the navbar
   ────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', function() {
  let current = '';

  // Find which section is currently in view
  sections.forEach(function(section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  // Highlight matching nav link
  navAs.forEach(function(link) {
    link.style.color = '';  // reset all
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--white)';  // highlight active
    }
  });
});


/* ──────────────────────────────────────────
   5. CONTACT FORM SUBMISSION
   Shows success feedback, then resets form
   ────────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();  // stop page from reloading

  const btn = contactForm.querySelector('.form-submit');

  // Show sent state
  btn.textContent = 'Sent! ✓';
  btn.style.background = 'var(--dim)';
  btn.disabled = true;

  // Reset after 3 seconds
  setTimeout(function() {
    contactForm.reset();
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
});
