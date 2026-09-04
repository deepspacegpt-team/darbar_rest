// ============ SAFE INIT ============
document.addEventListener('DOMContentLoaded', () => {
  console.log('Darbar Restaurant Sample website loaded successfully!');
  
  // Initialize AOS Animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
});

// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  if (window.scrollY > 500) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }
});

// ============ MOBILE MENU ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ============ SWIPER REVIEWS ============
if (typeof Swiper !== 'undefined') {
  try {
    new Swiper('.review-slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  } catch(e) { console.log('Swiper not loaded'); }
}

// ============ MENU TABS ============
const tabs = document.querySelectorAll('.tab');
const menuCards = document.querySelectorAll('.menu-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
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

// ============ FORM SUBMIT ============
async function handleSubmit(e) {
  e.preventDefault();

  // Collect data from the form
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
    // Send data to the Node.js server
    const response = await fetch('http://localhost:5000/api/reservations', {
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
    alert('❌ Server is not running. Please start the backend server first!');
  }
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
