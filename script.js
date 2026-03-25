// Navbar scroll
var nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Fade-up animace
var fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window && fadeEls.length) {
  fadeEls.forEach(function(el) { el.classList.add('animated'); });
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(function(el) { obs.observe(el); });
}

// Lightbox
var lbSets = {
  jaguar: [
    { src: 'img/jaguar-obyvak.jpg',         cap: 'Jaguár – Obývací pokoj' },
    { src: 'img/jaguar-loznice.jpg',         cap: 'Jaguár – Ložnice' },
    { src: 'img/jaguar-koupelna.jpg',        cap: 'Jaguár – Koupelna' },
    { src: 'img/jaguar-koupelna-sprcha.jpg', cap: 'Jaguár – Sprchový kout' }
  ],
  onyx: [
    { src: 'img/onyx-obyvak.jpg',           cap: 'Onyx – Obývací pokoj' },
    { src: 'img/onyx-kuchyne.jpg',          cap: 'Onyx – Kuchyně' },
    { src: 'img/onyx-loznice.jpg',          cap: 'Onyx – Ložnice' },
    { src: 'img/onyx-koupelna.jpg',         cap: 'Onyx – Koupelna' },
    { src: 'img/onyx-koupelna-sprcha.jpg',  cap: 'Onyx – Sprchový kout' }
  ],
  gallery: [
    { src: 'img/exterior.jpg',              cap: 'Exteriér penzionu' },
    { src: 'img/vana-zapad.jpg',            cap: 'Horká vana' },
    { src: 'img/jaguar-koupelna.jpg',       cap: 'Apartmán Jaguár – koupelna' },
    { src: 'img/onyx-obyvak.jpg',           cap: 'Apartmán Onyx – obývací pokoj' },
    { src: 'img/priroda-louka.jpg',         cap: 'Příroda v okolí' }
  ]
};

var curSet = [];
var curIdx = 0;

function lbOpenSet(setName, idx) {
  curSet = lbSets[setName];
  curIdx = idx;
  lbShow();
}

function lbShow() {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-caption');
  if (!lb || !img || !cap) return;
  img.src = curSet[curIdx].src;
  cap.textContent = curSet[curIdx].cap;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function lbClose() {
  var lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lbMove(dir) {
  curIdx = (curIdx + dir + curSet.length) % curSet.length;
  lbShow();
}

function lbClickOutside(e) {
  if (e.target === document.getElementById('lightbox')) lbClose();
}

document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbMove(-1);
  if (e.key === 'ArrowRight') lbMove(1);
});
