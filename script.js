/* =============================================
   BELLA NOTTE — script.js
   ============================================= */

/* ---- NAV: scroll effect + hamburger ---- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- MENU TABS ---- */
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-items');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    menuItems.forEach(m => {
      m.classList.toggle('active', m.dataset.tab === target);
    });
  });
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = target >= 1000
      ? current.toLocaleString()
      : current;
  }, 16);
}

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll(
  '.about-grid, .menu-card, .review-card, .stat, .gallery-grid img, .reservation-grid, .contact-grid'
);

revealEls.forEach(el => el.classList.add('reveal'));

const counterEls = document.querySelectorAll('.stat-num');
const counterObserved = new Set();

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      // Trigger counters when stats strip visible
      if (entry.target.classList.contains('stat')) {
        const num = entry.target.querySelector('.stat-num');
        if (num && !counterObserved.has(num)) {
          counterObserved.add(num);
          animateCounter(num);
        }
      }

      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

/* ---- RESERVATION FORM ---- */
const form = document.getElementById('reservationForm');
const formSuccess = document.getElementById('formSuccess');

// Set min date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    formSuccess.classList.add('show');
    submitBtn.textContent = 'Reservation Sent!';
    form.reset();

    setTimeout(() => {
      formSuccess.classList.remove('show');
      submitBtn.textContent = 'Confirm Reservation';
      submitBtn.disabled = false;
    }, 5000);
  }, 1200);
});

/* ---- BACK TO TOP ---- */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--gold)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));