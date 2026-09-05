// ============ GLOBAL SCOPE ============
// We attach handleSubmit to the window object so the HTML 'onsubmit' can find it
window.handleSubmit = async function(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    guests: document.getElementById('guests').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('🎉 Reservation successful! MR X will contact you shortly.');
      e.target.reset();
    } else {
      alert('❌ Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Server error. Please ensure the backend is deployed.');
  }
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  console.log('Darbar Restaurant: Initializing all systems...');

  // 1. AOS Animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }

  // 2. Swiper Reviews
  if (typeof Swiper !== 'undefined') {
    try {
      new Swiper('.review-slider', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { 
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev' 
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
      console.log('✅ Swiper initialized');
    } catch (e) { 
      console.error('❌ Swiper error:', e); 
    }
  }

  // 3. Menu Tabs
  const tabs = document.querySelectorAll('.tab');
  const menuCards = document.querySelectorAll('.menu-card');

  if (tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab styling
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter cards
        const filter = tab.dataset.tab;
        menuCards.forEach(card => {
          const cats = card.dataset.cat;
          if (filter === 'all' || cats.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
    console.log('✅ Menu Tabs initialized');
  }

  // 4. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 500 && scrollTop) {
      scrollTop.classList.add('show');
    } else if (scrollTop) {
      scrollTop.classList.remove('show');
    }
  });

  // 5. Mobile Menu Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // 6. Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('🚀 All systems active!');
});
