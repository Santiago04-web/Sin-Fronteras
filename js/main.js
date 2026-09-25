/**
 * SIN FRONTERAS - Script Interactivo Corporativo
 * JavaScript Nativo (Vanilla JS, 100% compatible con GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header con detección de scroll
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Menú Móvil Lateral
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    }, 10);
    document.body.style.overflow = 'hidden';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Modales Legales (Políticas y Términos)
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('[data-modal-close]');

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modal) => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      openModal(targetId);
    });
  });

  modalCloses.forEach((closeBtn) => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = closeBtn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach((modal) => {
        closeModal(modal);
      });
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    }
  });

  // 4. Formulario de Contacto Corporativo
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const phoneInput = document.getElementById('form-phone');
      const messageInput = document.getElementById('form-message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        formFeedback.className = 'mt-4 p-3 rounded-lg text-sm bg-red-950/80 border border-red-800 text-red-200 block';
        formFeedback.textContent = 'Por favor completa los campos obligatorios (Nombre, Correo y Mensaje).';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formFeedback.className = 'mt-4 p-3 rounded-lg text-sm bg-red-950/80 border border-red-800 text-red-200 block';
        formFeedback.textContent = 'Por favor ingresa un correo electrónico válido.';
        return;
      }

      formFeedback.className = 'mt-4 p-3 rounded-lg text-sm bg-emerald-950/80 border border-emerald-700 text-emerald-200 block';
      formFeedback.textContent = 'Generando mensaje para atención directa...';

      const emailSubject = encodeURIComponent(`Consulta Sin Fronteras - ${name}`);
      const emailBody = encodeURIComponent(
        `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || 'No especificado'}\n\nMensaje:\n${message}\n\nEnviado desde https://sinfronteras.online`
      );

      setTimeout(() => {
        window.location.href = `mailto:soporte@sinfronteras.online?subject=${emailSubject}&body=${emailBody}`;
        contactForm.reset();
        formFeedback.textContent = 'Mensaje preparado. Tu gestor de correo se ha abierto con los datos listos para enviar a soporte@sinfronteras.online.';
      }, 700);
    });
  }
});
