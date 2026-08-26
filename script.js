/* ============================================
   TH WEB DESIGNER — Scripts
   ============================================ */

(function () {
  'use strict';

  // ---------- Header scroll ----------
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Hamburger menu ----------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  const closeMenu = () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha menu ao clicar em um link (mobile)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMenu();
  });

  // ---------- Reveal on scroll ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ---------- WhatsApp com mensagem pré-preenchida ----------
  const WA_NUMBER = '5585989582114';
  const buildWaLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  document.querySelectorAll('[data-wa-msg]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = el.getAttribute('data-wa-msg') || 'Olá! Vim pelo site da TH Web Designer e gostaria de mais informações.';
      window.open(buildWaLink(msg), '_blank', 'noopener');
    });
  });

  // ---------- Formulário -> WhatsApp ----------
  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = (form.nome.value || '').trim() || '[NOME]';
      const servico = (form.servico.value || '').trim() || '[SERVIÇO]';
      const mensagem = (form.mensagem.value || '').trim() || '[MENSAGEM]';

      const texto = `Olá! Meu nome é ${nome}. Tenho interesse em ${servico}.\n\nMinha ideia/necessidade é:\n${mensagem}\n\nGostaria de saber mais sobre o serviço.`;

      window.open(buildWaLink(texto), '_blank', 'noopener');
    });
  }

  // ---------- Smooth scroll com offset do header fixo ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
