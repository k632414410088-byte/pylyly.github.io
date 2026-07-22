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

// Call this when you want to transition into the portfolio (fade duration in ms)
function showPortfolioTransition(duration = 2000, delayBefore = 900) {
  const finalScreen = document.getElementById('finalScreen');
  const portfolio = document.getElementById('portfolio');
  const portfolioBg = document.getElementById('portfolioBg');

  // Make sure portfolio exists
  if(!portfolio) return;

  // Show portfolio element (hidden) and prepare for fade-in
  portfolio.style.display = 'block';
  portfolio.style.transition = `opacity ${duration}ms ease`;
  portfolio.style.opacity = 0;
  portfolio.setAttribute('aria-hidden','false');

  // Optionally wait a short time so the "PYLYLY THE SELECTED HERO" can be seen
  setTimeout(()=>{
    // Fade out finalScreen if present
    if(finalScreen && finalScreen.style.display !== 'none') {
      finalScreen.style.transition = `opacity ${duration}ms ease`;
      finalScreen.style.opacity = 0;
      // remove after fade
      setTimeout(()=> {
        finalScreen.style.display = 'none';
        finalScreen.classList.remove('show');
      }, duration);
    }

    // Start playing bg video (best-effort)
    if(portfolioBg){
      portfolioBg.currentTime = 0;
      portfolioBg.play().catch(()=>{/* autoplay might be blocked; muted playback normally allowed */});
    }

    // Fade in portfolio
    requestAnimationFrame(()=> {
      portfolio.style.opacity = 1;
    });
  }, delayBefore);
}

// Example: integrate into your existing showFinal flow
// After showing finalTitle/finalSubtitle, call:
// setTimeout(()=> showPortfolioTransition(2000, 600), 900);
// - first param: fade duration (ms) — we use 2000 for 2s
// - second param: delay before starting fades after showing final (ms) — adjust to taste
