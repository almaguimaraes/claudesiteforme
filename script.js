(function(){
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  if (toggle && links){
    toggle.addEventListener('click', function(){
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- Lightbox ---------- */
  var lightbox      = document.getElementById('lightbox');
  var lightboxImg    = document.getElementById('lightboxImg');
  var lightboxClose  = document.getElementById('lightboxClose');
  var galleryItems   = document.querySelectorAll('.gallery-item');

  function openLightbox(src, alt){
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function(item){
    item.addEventListener('click', function(){
      var full = item.getAttribute('data-full');
      var img  = item.querySelector('img');
      // Don't open the lightbox for a placeholder that failed to load
      if (item.classList.contains('img-empty')) return;
      openLightbox(full, img ? img.alt : '');
    });
  });

  if (lightboxClose){
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox){
    lightbox.addEventListener('click', function(e){
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Nav background on scroll ---------- */
  var nav = document.getElementById('nav');
  var lastY = 0;
  function onScroll(){
    if (!nav) return;
    var y = window.scrollY || window.pageYOffset;
    nav.style.borderBottomColor = y > 40 ? 'rgba(243,236,221,0.16)' : 'rgba(243,236,221,0.10)';
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
