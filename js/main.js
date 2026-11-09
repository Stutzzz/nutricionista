/* ==========================================================================
   Ana Carla Mascarenhas · Nutricionista
   Interações (FAQ) + animações com GSAP (ScrollTrigger + SplitText).
   As animações seguem o site atual em WordPress — ver design.md, seção 7.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Ano atual no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- FAQ: um item aberto por vez ---------- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var button = item.querySelector('button');

    button.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('button').setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }

      // a altura da página muda: recalcula os gatilhos de scroll
      if (window.ScrollTrigger) setTimeout(function () { ScrollTrigger.refresh(); }, 450);
    });
  });

  /* ---------- Animações ---------- */
  var root = document.documentElement;

  // "Reduzir movimento" ativo, ou o GSAP demorou demais: mostra tudo sem animar.
  if (!root.classList.contains('js-anim')) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    root.classList.remove('js-anim');
    return;
  }

  window.__animReady = true;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  var hasSplit = typeof SplitText !== 'undefined';
  if (hasSplit) gsap.registerPlugin(SplitText);

  // Entrada das letras — mesmos valores do site atual (.textoAnimado)
  var CHARS_IN = {
    y: 40,
    autoAlpha: 0,
    filter: 'blur(20px)',
    duration: 1,
    ease: 'power3.out',
    stagger: { each: 0.02, from: 'random' },
    clearProps: 'filter'
  };

  function split(el) {
    return hasSplit ? SplitText.create(el, { type: 'words,chars', aria: 'auto' }) : null;
  }

  // Desliga transições CSS enquanto o GSAP move o elemento (evita "brigar" com o hover)
  function lock(els) {
    gsap.utils.toArray(els).forEach(function (el) { el.classList.add('gsap-lock'); });
  }
  function unlock() {
    this.targets().forEach(function (el) { el.classList.remove('gsap-lock'); });
  }

  // Espera as fontes (para o SplitText medir certo), no máximo 1,2s
  var fontsReady = Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise(function (resolve) { setTimeout(resolve, 1200); })
  ]);

  fontsReady.then(function () {
    heroIntro();
    headings();
    bars();
    reveals();
    steps();
    parallax();
    ScrollTrigger.refresh();
  });

  /* 1. Hero: sequência de entrada ao carregar */
  function heroIntro() {
    var hero = document.querySelector('.hero');
    var title = hero.querySelector('.hero__title');
    var cta = hero.querySelector('.hero__cta');

    gsap.set(hero.querySelectorAll('[data-hero]'), { autoAlpha: 1 });
    lock(cta);

    var chars = split(title);
    var hl = title.querySelector('.hl');
    if (hl) gsap.set(hl, { '--hl-p': 0 });

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero__photo', { autoAlpha: 0, y: 80, duration: 1.6, ease: 'expo.out' }, 0)
      .from('.hero__photo img', { scale: 1.08, duration: 2, ease: 'expo.out' }, 0)
      .from('.hero__logo', { autoAlpha: 0, rotation: -120, scale: 0.6, duration: 1.4, ease: 'expo.out' }, 0.3)
      .from('.hero__eyebrow .eyebrow__bar', { scaleY: 0, duration: 0.8, ease: 'expo.out' }, 0.2)
      .from('.hero__eyebrow .eyebrow__text', { autoAlpha: 0, x: -16, duration: 0.8 }, 0.3);

    if (chars) tl.from(chars.chars, CHARS_IN, 0.35);
    else tl.from(title, { autoAlpha: 0, y: 40, duration: 1 }, 0.35);

    if (hl) tl.to(hl, { '--hl-p': 1, duration: 1, ease: 'power3.inOut' }, 0.95);

    tl.from('.hero__lead', { autoAlpha: 0, y: 24, duration: 0.9 }, 1.0)
      .from(cta, { autoAlpha: 0, y: 24, duration: 0.9, onComplete: unlock }, 1.15)
      .from('.hero__features', { autoAlpha: 0, y: 30, duration: 0.9 }, 1.3)
      .from('.hero__features li', { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.12 }, 1.4);
  }

  /* 2. Títulos: letras entram com desfoque + pílula de destaque "pinta" a palavra */
  function headings() {
    gsap.utils.toArray('[data-split]').forEach(function (el) {
      var hl = el.querySelector('.hl');
      if (hl) gsap.set(hl, { '--hl-p': 0 });

      var chars = split(el);
      var tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
      });

      if (chars) tl.from(chars.chars, CHARS_IN);
      else tl.from(el, { autoAlpha: 0, y: 40, duration: 1, ease: 'power3.out' });

      if (hl) tl.to(hl, { '--hl-p': 1, duration: 1, ease: 'power3.inOut' }, 0.55);
    });
  }

  /* 3. Barras: crescem de baixo para cima (igual ao .custom-border-left do WP) */
  function bars() {
    gsap.utils.toArray('[data-bar]').forEach(function (bar) {
      var horizontal = bar.offsetWidth > bar.offsetHeight;
      var from = { duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: bar, start: 'top 88%' } };
      from[horizontal ? 'scaleX' : 'scaleY'] = 0;
      gsap.from(bar, from);
    });
  }

  /* 4. Blocos e grupos de cards: fade + subida */
  function reveals() {
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      lock(el);
      gsap.from(el, {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        onComplete: unlock,
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    gsap.utils.toArray('[data-reveal-group]').forEach(function (group) {
      lock(group.children);
      gsap.from(group.children, {
        autoAlpha: 0,
        y: 48,
        duration: 0.9,
        ease: 'power3.out',
        stagger: { each: 0.12, onComplete: unlock },
        scrollTrigger: { trigger: group, start: 'top 85%' }
      });
    });

    // Fotos: entram com um leve zoom-out
    gsap.utils.toArray('[data-photo-reveal]').forEach(function (box) {
      gsap.from(box.querySelector('img'), {
        scale: 1.18,
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: box, start: 'top 85%' }
      });
    });

    gsap.from('.faq__photo', {
      autoAlpha: 0,
      y: 60,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.faq__photo', start: 'top 85%' }
    });

    // Salada "chega" pela direita e fica flutuando
    gsap.from('.guarantee__salad', {
      autoAlpha: 0,
      x: 80,
      rotation: 8,
      duration: 1.3,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.guarantee__card', start: 'top 85%' }
    });
    gsap.to('.guarantee__salad img', { y: -10, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });

    // Ilustração do contato desce do teto
    gsap.from('.contact__illustration', {
      autoAlpha: 0,
      y: -30,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.contact__card', start: 'top 85%' }
    });
  }

  /* 5. Cards 01/02/03: deslizam na horizontal com o scroll (Motion Effects do WP, velocidades 2/4/6) */
  function steps() {
    var mm = gsap.matchMedia();

    mm.add({ desktop: '(min-width: 960px)', mobile: '(max-width: 959px)' }, function (ctx) {
      var unit = ctx.conditions.desktop ? 40 : 14;

      gsap.utils.toArray('[data-drift]').forEach(function (card) {
        var speed = Number(card.dataset.drift) || 2;

        gsap.fromTo(card, { x: speed * unit }, {
          x: 0,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 45%', scrub: 0.6 }
        });
        gsap.from(card, {
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 92%' }
        });
      });
    });
  }

  /* 6. Parallax suave */
  function parallax() {
    // foto do hero desce um pouco mais devagar que o scroll
    gsap.to('.hero__photo img', {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // blobs de fundo
    gsap.utils.toArray('[data-blob]').forEach(function (blob) {
      gsap.fromTo(blob, { yPercent: -8 }, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: blob.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // alimentos do banner de formatos giram e sobem com o scroll
    gsap.fromTo('.formats__media img', { rotation: -36, y: 40 }, {
      rotation: -26,
      y: -30,
      ease: 'none',
      scrollTrigger: { trigger: '.formats__card', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    // bowl da prova social balança levemente; bloco laranja em velocidade diferente
    gsap.fromTo('.social__bowl img', { rotation: -6, y: 30 }, {
      rotation: 4,
      y: -20,
      ease: 'none',
      scrollTrigger: { trigger: '.social__bowl', start: 'top bottom', end: 'bottom top', scrub: true }
    });
    gsap.fromTo('.social__bowl-bg', { y: -10 }, {
      y: 20,
      ease: 'none',
      scrollTrigger: { trigger: '.social__bowl', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }
})();
