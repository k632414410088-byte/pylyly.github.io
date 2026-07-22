// Basic interactions: year, smooth scroll, intro flow, nav toggle, reveal observer

document.addEventListener('DOMContentLoaded', ()=>{

  // Current year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Intro / Reveal / Start flow
  const overlay = document.getElementById('intro-overlay');
  const video = document.getElementById('intro-video');
  const enter = document.getElementById('intro-enter');
  const skip = document.getElementById('intro-skip');
  const revealSection = document.getElementById('reveal');
  const revealStart = document.getElementById('reveal-start');
  const heroSection = document.getElementById('hero');

  if(enter){
    enter.addEventListener('click', ()=>{
      // hide overlay
      if(video && !video.paused) video.pause();
      overlay.style.transition = 'opacity .6s';
      overlay.style.opacity = '0';
      setTimeout(()=>{ overlay.style.display = 'none';
        if(revealSection) {
          revealSection.classList.add('visible');
          revealSection.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }, 650);
    });
  }

  if(skip){
    skip.addEventListener('click', ()=> enter && enter.click());
  }

  if(revealStart){
    revealStart.addEventListener('click', ()=>{
      if(revealSection){
        revealSection.classList.remove('visible');
        revealSection.style.transition = 'opacity .4s, transform .4s';
        revealSection.style.opacity = '0';
        revealSection.style.transform = 'translateY(-8px)';
      }
      setTimeout(()=>{
        if(heroSection) {
          heroSection.classList.remove('hero-hidden');
          heroSection.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }, 420);
    });
  }

  // Mobile nav toggle
  const burger = document.querySelector('.nav-burger');
  if(burger){
    burger.addEventListener('click', ()=>{
      const nav = document.querySelector('.nav');
      if(!nav) return;
      nav.style.display = (nav.style.display === 'flex' || nav.style.display === 'block') ? 'none' : 'block';
      if(nav.style.display === 'block') nav.style.flexDirection = 'column';
    });
  }

  // Simple reveal on scroll for panels (optional)
  const revealElems = document.querySelectorAll('.panel, .mission, .ability, .stat-card, .alliance-list .member');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          entry.target.classList.remove('reveal');
        }
      });
    }, {threshold: 0.12});
    revealElems.forEach(el=>{
      el.classList.add('reveal');
      io.observe(el);
    });
  } else {
    revealElems.forEach(el => el.classList.add('visible'));
  }

});
