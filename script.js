// Sabtain Ali — Portfolio interactions

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const header = document.getElementById('site-header');
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  header.classList.toggle('open');
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => header.classList.remove('open'));
});

// Contact form submission (Formspree)
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    formStatus.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent — thank you. I\'ll reply soon.';
        contactForm.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (err) {
      formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Reveal sections on scroll
const revealTargets = document.querySelectorAll('.section, #hero');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Hero renders immediately (avoid blank first paint)
window.addEventListener('load', () => {
  const hero = document.getElementById('hero');
  hero.style.opacity = '1';
  hero.style.transform = 'translateY(0)';
});