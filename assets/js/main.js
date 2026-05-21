/* =============================================
   WONDERWOODS — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.querySelector('.navbar-wonderwoods');

  function handleScroll() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load


  /* ---------- Mobile nav toggle ---------- */
  const toggler = document.querySelector('.navbar-toggler');
  const navMenu = document.querySelector('.navbar-nav');

  if (toggler && navMenu) {
    toggler.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      // Animate hamburger → X
      const bars = toggler.querySelectorAll('span');
      toggler.classList.toggle('active');
      if (toggler.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity  = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity  = '';
        bars[2].style.transform = '';
      }
    });
  }


  /* ---------- Banner Custom Carousel (Multiple Instances) ---------- */
  const bannerCarousels = document.querySelectorAll('.banner-owl');
  
  bannerCarousels.forEach((bannerCarousel) => {
    const slides = bannerCarousel.querySelectorAll('.banner-slide');
    let currentSlide = 0;
    let autoplayInterval;

    // Create wrapper divs for carousel structure
    const carousel = document.createElement('div');
    carousel.className = 'carousel-wrapper';
    
    // Move existing structure into wrapper
    bannerCarousel.appendChild(carousel);

    function showSlide(n) {
      // Loop the slides
      if (n >= slides.length) {
        currentSlide = 0;
      } else if (n < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = n;
      }

      // Animate all slides
      slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        
        if (index === currentSlide) {
          // New active slide - add active class for animation
          slide.classList.add('active');
        } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
          // Previous slide - mark as prev for fade out
          slide.classList.add('prev');
        }
      });

      // Update dots for this carousel only
      const bannerSection = bannerCarousel.closest('.banner-section');
      const dots = bannerSection.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
          dot.classList.add('active');
        }
      });
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5500);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Get the banner section for this carousel
    const bannerSection = bannerCarousel.closest('.banner-section');

    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots owl-dots';
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot owl-dot';
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        stopAutoplay();
        showSlide(index);
        startAutoplay();
      });
      const dotSpan = document.createElement('span');
      dotsContainer.appendChild(dot);
      dot.appendChild(dotSpan);
    });

    // Create navigation buttons
    const navPrev = document.createElement('button');
    navPrev.className = 'carousel-nav owl-prev';
    navPrev.innerHTML = '<i class="ri-arrow-left-line"></i>';
    navPrev.addEventListener('click', () => {
      stopAutoplay();
      prevSlide();
      startAutoplay();
    });

    const navNext = document.createElement('button');
    navNext.className = 'carousel-nav owl-next';
    navNext.innerHTML = '<i class="ri-arrow-right-line"></i>';
    navNext.addEventListener('click', () => {
      stopAutoplay();
      nextSlide();
      startAutoplay();
    });

    // Append navigation elements to this carousel's section
    bannerSection.appendChild(dotsContainer);
    bannerSection.appendChild(navPrev);
    bannerSection.appendChild(navNext);

    // Show first slide and start autoplay
    showSlide(0);
    startAutoplay();

    // Pause on hover, resume on leave
    bannerSection.addEventListener('mouseenter', stopAutoplay);
    bannerSection.addEventListener('mouseleave', startAutoplay);
  });


  /* ---------- Scroll-reveal (lightweight) ---------- */
  const revealEls = document.querySelectorAll(
    '.about-stat-card, .about-feature-item, .about-problem-left, .about-partner-inner > *'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

});



// cursor effect

// const cursor = document.querySelector('.custom-cursor');
// const dot = document.querySelector('.cursor-dot');

// let mouseX = 0;
// let mouseY = 0;

// let cursorX = 0;
// let cursorY = 0;

/* Mouse Move */
// document.addEventListener('mousemove', (e) => {

//     mouseX = e.clientX;
//     mouseY = e.clientY;

//     dot.style.left = mouseX + 'px';
//     dot.style.top = mouseY + 'px';

// });

/* Smooth Animation */
// function animateCursor(){

//     cursorX += (mouseX - cursorX) * 0.15;
//     cursorY += (mouseY - cursorY) * 0.15;

//     cursor.style.left = cursorX + 'px';
//     cursor.style.top = cursorY + 'px';

//     requestAnimationFrame(animateCursor);
// }

// animateCursor();

/* Hover Effect */
// const hoverElements = document.querySelectorAll('a, button');

// hoverElements.forEach(el => {

//     el.addEventListener('mouseenter', () => {
//         cursor.classList.add('hover');
//     });

//     el.addEventListener('mouseleave', () => {
//         cursor.classList.remove('hover');
//     });

// });



