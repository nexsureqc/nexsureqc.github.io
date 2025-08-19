/* slider.js - fade + autoplay + arrows + dots + single/double click */
document.addEventListener('DOMContentLoaded', function(){
  const slider = document.getElementById('slider');
  if(!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('dots');

  let current = 0;
  let interval = null;
  const delay = 4000;

  // create dots
  dotsWrap.innerHTML = '';
  slides.forEach((s, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.dataset.index = i;
    d.setAttribute('aria-label', 'Go to slide ' + (i+1));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

  function showSlide(idx){
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
  }
  function next(){ showSlide((current + 1) % slides.length); }
  function prev(){ showSlide((current - 1 + slides.length) % slides.length); }

  function start(){ if(interval) clearInterval(interval); interval = setInterval(next, delay); }
  function stop(){ if(interval){ clearInterval(interval); interval = null; } }

  // controls
  if(nextBtn) nextBtn.addEventListener('click', () => { next(); stop(); start(); });
  if(prevBtn) prevBtn.addEventListener('click', () => { prev(); stop(); start(); });
  dots.forEach(d => d.addEventListener('click', e => { showSlide(+e.currentTarget.dataset.index); stop(); start(); }));

  // pause on hover
  const sliderWrap = document.querySelector('.slider-wrap');
  if(sliderWrap){
    sliderWrap.addEventListener('mouseenter', stop);
    sliderWrap.addEventListener('mouseleave', start);
  }

  // Single click → service page, Double click → home (also support native dblclick)
  slides.forEach(s => {
    let clicks = 0;
    s.addEventListener('click', () => {
      clicks++;
      if(clicks === 1){
        setTimeout(() => {
          if(clicks === 1){
            const link = s.dataset.link;
            if(link) window.location.href = link;
          }
          clicks = 0;
        }, 300);
      }
    });
    s.addEventListener('dblclick', () => window.location.href = 'index.html');
  });

  // init
  showSlide(0);
  start();
});
