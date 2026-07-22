// Simple script: year, smooth scroll, mobile nav, reveal on scroll

// Current year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile nav after click
      if(window.innerWidth <= 900){
        const nav = document.querySelector('.nav');
        if(nav) nav.style.display = 'none';
      }
    }
  });
});

// Mobile nav toggle
const burger = document.querySelector('.nav-burger');
if(burger){
  burger.addEventListener('click', ()=>{
    const nav = document.querySelector('.nav');
    if(!nav) return;
    nav.style.display = (nav.style.display === 'flex' || nav.style.display === 'block') ? 'none' : 'block';
    // ensure mobile friendly
    if(nav.style.display === 'block') nav.style.flexDirection = 'column';
  });
}

// IntersectionObserver reveal
const revealElems = document.querySelectorAll('.panel, .hero-inner, .mission, .ability, .stat-card, .alliance-list .member');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      entry.target.classList.remove('reveal');
    }
  });
  document.addEventListener('DOMContentLoaded', ()=>{

  const overlay = document.getElementById('intro-overlay');
  const video = document.getElementById('intro-video');
  const enter = document.getElementById('intro-enter');
  const skip = document.getElementById('intro-skip');
  const revealSection = document.getElementById('reveal');
  const revealStart = document.getElementById('reveal-start');
  const heroSection = document.getElementById('hero');

  // ENTER: hide overlay → show reveal
  if(enter){
    enter.addEventListener('click', ()=>{
      if(video && !video.paused) video.pause();
      overlay.style.transition = 'opacity .6s';
      overlay.style.opacity = '0';
      setTimeout(()=>{ overlay.style.display = 'none';
        revealSection.classList.add('visible');
        revealSection.scrollIntoView({behavior:'smooth', block:'start'});
      }, 650);
    });
  }

  // SKIP same as enter
  if(skip){ skip.addEventListener('click', ()=> enter && enter.click()); }

  // Start: hide reveal → show hero
  if(revealStart){
    revealStart.addEventListener('click', ()=>{
      revealSection.classList.remove('visible');
      revealSection.style.transition = 'opacity .4s, transform .4s';
      revealSection.style.opacity = '0';
      revealSection.style.transform = 'translateY(-8px)';
      setTimeout(()=>{
        heroSection.classList.remove('hero-hidden');
        heroSection.scrollIntoView({behavior:'smooth', block:'start'});
      }, 420);
    });
  }

});
},{threshold: 0.12});
revealElems.forEach(el=>{
  el.classList.add('reveal');
  io.observe(el);
});
