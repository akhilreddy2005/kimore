import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp }
    from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAzqlIiBZfJ7SzVOYSConOM1q594b3c-8M",

  authDomain: "kimore.firebaseapp.com",

  projectId: "kimore",

  storageBucket: "kimore.firebasestorage.app",

  messagingSenderId: "276399876050",

  appId: "1:276399876050:web:cc3aba1b8b7cc6d4ad4a0b",

  measurementId: "G-BHR060JEFQ"
  };

  const app = initializeApp(firebaseConfig);
  const db  = getFirestore(app);
  const analytics = getAnalytics(app);

  /* ── Toast ── */
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  /* ── Theme Toggle ── */
  const html      = document.documentElement;
  const themeBtn  = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  themeBtn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  });

  /* ── Navbar scroll ── */
  const navbar      = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = pct + '%';
  });

  /* ── Hamburger / Drawer ── */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');
  const overlay   = document.getElementById('drawerOverlay');
  window.closeDrawer = function () {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  };
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
  });
  overlay.addEventListener('click', window.closeDrawer);

  /* ── NOTIFY ME → saves to "subscribers" collection ── */
  window.subscribe = async function () {
    const val = document.getElementById('emailInput').value.trim();
    if (!val || !val.includes('@')) {
      showToast('⚠ Please enter a valid email.');
      return;
    }
    try {
      await addDoc(collection(db, 'subscribers'), {
        email:     val,
        createdAt: serverTimestamp()
      });
      document.getElementById('emailInput').value = '';
      showToast("✨ You're on the list! We'll be in touch.");
    } catch (err) {
      console.error(err);
      showToast('⚠ Something went wrong. Please try again.');
    }
  };

  /* ── CONTACT FORM → saves to "messages" collection ── */
  window.sendMessage = async function () {
    const n = document.getElementById('fname').value.trim();
    const e = document.getElementById('femail').value.trim();
    const m = document.getElementById('fmsg').value.trim();
    if (!n || !e || !m) {
      showToast('⚠ Please fill all fields.');
      return;
    }
    try {
      await addDoc(collection(db, 'messages'), {
        name:      n,
        email:     e,
        message:   m,
        createdAt: serverTimestamp()
      });
      document.getElementById('fname').value  = '';
      document.getElementById('femail').value = '';
      document.getElementById('fmsg').value   = '';
      showToast("✉ Message sent! We'll respond soon.");
    } catch (err) {
      console.error(err);
      showToast('⚠ Something went wrong. Please try again.');
    }
  };

  /* ── Scroll Reveal ── */
  const reveals  = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => observer.observe(r));

  /* ── Particles ── */
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  const pts = Array.from({ length: 55 }, () => ({
    x:  Math.random() * window.innerWidth,
    y:  Math.random() * window.innerHeight,
    r:  Math.random() * 1.4 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    o:  Math.random() * 0.5 + 0.1
  }));
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = html.getAttribute('data-theme') === 'dark';
    const color  = isDark ? '201,169,110' : '154,106,42';
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},${p.o})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();