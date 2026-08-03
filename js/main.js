/**
 * Sanyukta The Digital Hub — Main JavaScript Logic
 * Theme Switcher, Responsive Mobile Navigation, Waveform Canvas, Pitch Calculator & GMB Integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initSignalCanvas();
  initWaveformObserver();
  initTestimonials();
  initPitchModal();
  initContactForm();
});

/* ==========================================================================
   1. Theme Switcher (Light / Dark Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('sanyukta-theme') || 'dark';

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sanyukta-theme', newTheme);
      updateThemeIcon(newTheme);

      // Trigger custom event so canvas can update grid lines
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  if (theme === 'light') {
    // Sun icon for light mode
    themeBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    themeBtn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    // Moon icon for dark mode
    themeBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    themeBtn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   2. Navbar & Mobile Menu Handling (Fixed resize bug)
   ========================================================================== */
function initNavbar() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Handle window resize cleanly to prevent nav disappearing when switching mobile -> desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks) {
      navLinks.classList.remove('active');
    }
  });
}

/* ==========================================================================
   3. Interactive Signal Waveform Canvas (Hero)
   ========================================================================== */
function initSignalCanvas() {
  const canvas = document.getElementById('signalCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let phase = 0;
  let mouseX = 0.5;

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / width;
  });

  function drawWave() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Grid dots background
    ctx.fillStyle = isLight ? 'rgba(18, 19, 26, 0.06)' : 'rgba(246, 245, 241, 0.04)';
    for (let x = 0; x < width; x += 24) {
      for (let y = 0; y < height; y += 24) {
        ctx.fillRect(x, y, 2, 2);
      }
    }

    // Secondary ambient signal wave (Gold)
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = isLight ? 'rgba(216, 152, 45, 0.5)' : 'rgba(232, 178, 75, 0.35)';
    for (let x = 0; x < width; x += 5) {
      const freq = 0.015;
      const amp = 20 + mouseX * 15;
      const y = height / 2 + Math.sin(x * freq + phase * 0.8) * amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Main Signal Pulse Wave (Signal Red)
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF4F3E';
    ctx.shadowBlur = isLight ? 4 : 12;
    ctx.shadowColor = '#FF4F3E';

    for (let x = 0; x < width; x += 3) {
      const distFromCenter = Math.abs(x - width / 2) / (width / 2);
      const spikeFactor = Math.exp(-Math.pow((x / width - mouseX) * 4, 2));
      const freq = 0.02 + spikeFactor * 0.05;
      const amp = 30 + spikeFactor * 70;
      
      const y = height / 2 + Math.sin(x * freq + phase) * amp * (1 - distFromCenter * 0.5);

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    phase += 0.04;
    requestAnimationFrame(drawWave);
  }

  drawWave();
}

/* ==========================================================================
   4. Section Divider Waveform Intersection Observer
   ========================================================================== */
function initWaveformObserver() {
  const dividers = document.querySelectorAll('.waveform-divider');
  if (!dividers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.2 });

  dividers.forEach(divider => observer.observe(divider));
}

/* ==========================================================================
   5. Testimonials Quote Switcher
   ========================================================================== */
const testimonialsData = [
  {
    quote: "“Before Sanyukta, our digital outreach was basically shouting into a void. Their targeted signal strategy brought us 3.4x more qualified local leads in 60 days.”",
    name: "Rajesh Sharma",
    role: "Managing Director, Apex Properties Thane"
  },
  {
    quote: "“Most agencies sell fluff and vanity metrics. Sanyukta delivered real conversion growth with full visibility into lead acquisition costs.”",
    name: "Priya Nair",
    role: "Founder, Zenith Healthcare Clinics"
  },
  {
    quote: "“Their team cut through our market static. We went from invisible on Google Search to ranking top 3 for all primary keywords in Thane.”",
    name: "Amit Varma",
    role: "Operations Head, Varma Retail & Logistics"
  }
];

function initTestimonials() {
  const quoteText = document.getElementById('testiQuote');
  const authorName = document.getElementById('testiAuthorName');
  const authorRole = document.getElementById('testiAuthorRole');
  const dotsContainer = document.getElementById('testiDots');

  if (!quoteText || !dotsContainer) return;

  dotsContainer.innerHTML = '';
  testimonialsData.forEach((item, index) => {
    const dot = document.createElement('button');
    dot.className = `testi-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Testimonial ${index + 1}`);
    dot.addEventListener('click', () => setTestimonial(index));
    dotsContainer.appendChild(dot);
  });

  function setTestimonial(index) {
    const data = testimonialsData[index];
    quoteText.style.opacity = '0';
    setTimeout(() => {
      quoteText.textContent = data.quote;
      authorName.textContent = data.name;
      authorRole.textContent = data.role;
      quoteText.style.opacity = '1';

      document.querySelectorAll('.testi-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    }, 200);
  }
}

/* ==========================================================================
   6. Pitch & Live Demo Mode (ROI Calculator Modal)
   ========================================================================== */
function initPitchModal() {
  const modalOverlay = document.getElementById('pitchModalOverlay');
  const openBtns = document.querySelectorAll('.trigger-pitch-mode');
  const closeBtn = document.getElementById('pitchModalClose');
  const adBudgetInput = document.getElementById('calcBudget');
  const avgDealInput = document.getElementById('calcDealValue');
  const resultDisplay = document.getElementById('calcEstRevenue');
  const leadsDisplay = document.getElementById('calcEstLeads');

  if (!modalOverlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      calculatePitchROI();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  if (adBudgetInput && avgDealInput) {
    adBudgetInput.addEventListener('input', calculatePitchROI);
    avgDealInput.addEventListener('input', calculatePitchROI);
  }

  function calculatePitchROI() {
    const budget = parseFloat(adBudgetInput.value) || 25000;
    const dealVal = parseFloat(avgDealInput.value) || 150000;

    const estLeads = Math.floor(budget / 350);
    const estDeals = Math.max(1, Math.floor(estLeads * 0.08));
    const estRevenue = estDeals * dealVal;

    if (leadsDisplay) leadsDisplay.textContent = `${estLeads} - ${estLeads + 15} Qualified Leads/mo`;
    if (resultDisplay) resultDisplay.textContent = `₹${estRevenue.toLocaleString('en-IN')}`;
  }
}

/* ==========================================================================
   7. Contact Form & WhatsApp Deep Link Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccessMsg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    if (successMsg) {
      successMsg.style.display = 'block';
    }

    const waText = encodeURIComponent(
      `Hello Sanyukta Team,\n\nI visited your website and would like to start a conversation.\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Message:* ${message}`
    );
    const waUrl = `https://wa.me/919833312656?text=${waText}`;

    setTimeout(() => {
      form.reset();
      if (confirm('Would you like to open WhatsApp to connect directly with Sanyukta right now?')) {
        window.open(waUrl, '_blank');
      }
    }, 600);
  });
}
