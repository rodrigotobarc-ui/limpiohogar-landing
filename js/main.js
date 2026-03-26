/**
 * LimpioHogar - Main JavaScript
 * Navigation, scroll, animations, form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initContactForm();
  initTrabajaForm();
});

/* ─── Navbar ─── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });

  // Mobile hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      mobileMenu.classList.remove('is-open');
    });
  });
}

/* ─── Smooth scroll ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─── Scroll fade-in animations ─── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ─── Contact form ─── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const feedback = document.getElementById('contact-feedback');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const data = {
      nombre: form.querySelector('#contact-nombre').value,
      email: form.querySelector('#contact-email').value,
      telefono: form.querySelector('#contact-telefono').value,
      mensaje: form.querySelector('#contact-mensaje').value
    };

    try {
      const ok = await submitForm(FORM_ID_CONTACTO, data);
      if (ok) {
        feedback.textContent = 'Mensaje enviado correctamente. Te responderemos pronto.';
        feedback.className = 'form-feedback form-feedback--success';
        form.reset();
      } else {
        throw new Error('Error');
      }
    } catch {
      feedback.textContent = 'Hubo un error al enviar. Intenta nuevamente.';
      feedback.className = 'form-feedback form-feedback--error';
    }

    feedback.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Enviar mensaje';
  });
}

/* ─── Trabaja con nosotros form ─── */
function initTrabajaForm() {
  const form = document.getElementById('trabaja-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const feedback = document.getElementById('trabaja-feedback');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const data = {
      nombre: form.querySelector('#trabaja-nombre').value,
      apellido: form.querySelector('#trabaja-apellido').value,
      telefono: form.querySelector('#trabaja-telefono').value,
      correo: form.querySelector('#trabaja-email').value,
      direccion: form.querySelector('#trabaja-direccion').value,
      mensaje: form.querySelector('#trabaja-mensaje').value
    };

    try {
      // Dual submission: Formspree + Supabase
      const [formspreeOk, supabaseOk] = await Promise.all([
        submitForm(FORM_ID_TRABAJA, data),
        insertCandidata(data)
      ]);

      if (formspreeOk || supabaseOk) {
        feedback.textContent = 'Solicitud enviada correctamente. Revisaremos tu información y te contactaremos pronto.';
        feedback.className = 'form-feedback form-feedback--success';
        form.reset();
      } else {
        throw new Error('Error');
      }
    } catch {
      feedback.textContent = 'Hubo un error al enviar. Intenta nuevamente.';
      feedback.className = 'form-feedback form-feedback--error';
    }

    feedback.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Quiero trabajar con ustedes';
  });
}
