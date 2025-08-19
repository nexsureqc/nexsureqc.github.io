/* slider.js - fade effect slider with autoplay, arrows, dots, click logic */
(function(){
  const slider = document.getElementById('slider');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('dots');
  let current = 0;
  let interval = null;
  const delay = 4000; // ms

  // create dots
  slides.forEach((s, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.dataset.index = i;
    d.setAttribute('aria-label', 'Go to slide ' + (i+1));
    dotsWrap.appendChild(d);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

  function showSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
  }

  function next() { showSlide((current + 1) % slides.length); }
  function prev() { showSlide((current - 1 + slides.length) % slides.length); }

  // autoplay
  function start() {
    if (interval) clearInterval(interval);
    interval = setInterval(next, delay);
  }
  function stop() { if (interval) { clearInterval(interval); interval = null; } }

  // event listeners
  nextBtn.addEventListener('click', () => { next(); stop(); start(); });
  prevBtn.addEventListener('click', () => { prev(); stop(); start(); });
  dots.forEach(d => d.addEventListener('click', e => {
    showSlide(Number(e.target.dataset.index));
    stop(); start();
  }));

  // pause on hover
  const sliderWrap = document.querySelector('.slider-wrap');
  sliderWrap.addEventListener('mouseenter', stop);
  sliderWrap.addEventListener('mouseleave', start);

  // Single click = go to service, Double click = back home
  slides.forEach(s => {
    let clicked = 0;
    s.addEventListener('click', e => {
      clicked++;
      if (clicked === 1) {
        setTimeout(() => {
          if (clicked === 1) {
            const link = s.dataset.link;
            if (link) window.location.href = link;
          } else {
            window.location.href = "index.html";
          }
          clicked = 0;
        }, 300); // short timeout to differentiate double click
      }
    });
  });

  // init
  showSlide(0);
  start();
})();
