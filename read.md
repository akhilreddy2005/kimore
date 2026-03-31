<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Kimoré Labs — Coming Soon</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<link rel="stylesheet" href="style.css"/>
<style>
     :root { --transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    [data-theme="dark"] {
      --bg:#0d0c0b; --bg2:#141210; --bg3:#1c1916; --surface:#201d1a;
      --border:rgba(201,169,110,0.15); --gold:#c9a96e; --gold-light:#e8d5b0;
      --gold-dim:rgba(201,169,110,0.25); --text:#f0e8df; --text-muted:#a89880;
      --overlay:rgba(13,12,11,0.92); --card:rgba(28,25,22,0.85);
    }
    [data-theme="light"] {
      --bg:#faf6f1; --bg2:#f5ede3; --bg3:#efe5d8; --surface:#ffffff;
      --border:rgba(150,110,60,0.2); --gold:#9a6a2a; --gold-light:#c49045;
      --gold-dim:rgba(154,106,42,0.15); --text:#2a2018; --text-muted:#7a6555;
      --overlay:rgba(250,246,241,0.94); --card:rgba(255,255,255,0.9);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg); color: var(--text);
      transition: background var(--transition), color var(--transition);
      overflow-x: hidden;
    }

    #particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.35; }

    #progress-bar {
      position: fixed; top: 0; left: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold), var(--gold-light));
      z-index: 9999; width: 0%; transition: width 0.1s;
    }

    /* ── NAVBAR ── */
    nav {
      position: fixed; top: 0; width: 100%; z-index: 1000;
      padding: 0 2.5rem;
      display: flex; align-items: center; justify-content: space-between;
      height: 70px; background: transparent;
      transition: background var(--transition), backdrop-filter var(--transition), box-shadow var(--transition);
      animation: navSlide 0.8s ease both;
    }
    nav.scrolled {
      background: var(--overlay); backdrop-filter: blur(18px);
      box-shadow: 0 1px 0 var(--border);
    }
    @keyframes navSlide { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem; font-weight: 300; letter-spacing: 0.15em;
      color: var(--gold); text-decoration: none;
      transition: opacity 0.3s, letter-spacing 0.3s;
    }
    .nav-logo:hover { opacity: 0.75; letter-spacing: 0.25em; }

    .nav-links { display: flex; align-items: center; gap: 2.2rem; list-style: none; }
    .nav-links a {
      color: var(--text-muted); text-decoration: none; font-size: 0.82rem;
      letter-spacing: 0.12em; text-transform: uppercase;
      position: relative; padding-bottom: 4px; transition: color 0.3s;
    }
    .nav-links a::after {
      content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px;
      background: var(--gold); transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    .nav-links a:hover { color: var(--gold); }
    .nav-links a:hover::after { width: 100%; }

    .theme-toggle {
      width: 42px; height: 42px; border-radius: 50%;
      border: 1px solid var(--border); background: var(--gold-dim);
      color: var(--gold); font-size: 1rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.3s, transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    }
    .theme-toggle:hover {
      background: var(--gold); color: var(--bg);
      transform: rotate(20deg) scale(1.1); box-shadow: 0 0 18px var(--gold-dim);
    }
    .theme-toggle:active { transform: scale(0.95); }

    .hamburger {
      display: none; flex-direction: column; gap: 5px; cursor: pointer;
      background: none; border: none; padding: 6px;
    }
    .hamburger span {
      width: 24px; height: 1.5px; background: var(--gold); display: block;
      transition: transform 0.35s, opacity 0.35s, width 0.35s;
    }
    .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
    .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

    .mobile-drawer {
      position: fixed; top: 0; right: -100%; width: min(80vw, 320px); height: 100vh;
      background: var(--bg2); border-left: 1px solid var(--border);
      z-index: 999; display: flex; flex-direction: column;
      justify-content: center; align-items: center; gap: 2.5rem;
      transition: right 0.4s cubic-bezier(0.4,0,0.2,1);
    }
    .mobile-drawer.open { right: 0; }
    .mobile-drawer a {
      color: var(--text); text-decoration: none;
      font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300;
      letter-spacing: 0.1em; transition: color 0.3s, letter-spacing 0.3s;
    }
    .mobile-drawer a:hover { color: var(--gold); letter-spacing: 0.25em; }

    .drawer-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      z-index: 998; opacity: 0; pointer-events: none; transition: opacity 0.4s;
    }
    .drawer-overlay.open { opacity: 1; pointer-events: all; }

    /* ── SECTIONS ── */
    section { position: relative; z-index: 1; }

    .reveal {
      opacity: 0; transform: translateY(40px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.35s; }
    .reveal-delay-4 { transition-delay: 0.5s; }
    .reveal-delay-5 { transition-delay: 0.65s; }

    /* ── HERO ── */
    #hero {
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      padding: 120px 2rem 80px;
      background: radial-gradient(ellipse 80% 60% at 50% 40%, var(--bg3) 0%, var(--bg) 70%);
    }

    .hero-eyebrow {
      font-size: 0.75rem; letter-spacing: 0.35em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 1.5rem;
      animation: fadeUp 1s 0.3s ease both;
    }
    .hero-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 8vw, 7rem);
      font-weight: 300; line-height: 1.05;
      letter-spacing: 0.02em; color: var(--text);
      animation: fadeUp 1s 0.5s ease both;
    }
    .hero-title em { color: var(--gold); font-style: italic; }

    .hero-sub {
      font-size: clamp(0.9rem, 2vw, 1.1rem); color: var(--text-muted);
      margin-top: 1.5rem; max-width: 500px; line-height: 1.8;
      animation: fadeUp 1s 0.7s ease both;
    }

    .gold-line {
      width: 60px; height: 1px; background: var(--gold); margin: 2rem auto;
      animation: expandLine 1s 0.9s ease both;
    }
    @keyframes expandLine { from { width: 0; opacity: 0; } to { width: 60px; opacity: 1; } }

    /* Pills */
    .hero-pills {
      display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center;
      animation: fadeUp 1s 1.0s ease both;
    }
    .pill {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.5rem 1.1rem;
      border: 1px solid var(--border); border-radius: 40px;
      font-size: 0.78rem; letter-spacing: 0.08em; color: var(--text-muted);
      background: var(--card); backdrop-filter: blur(8px);
      transition: border-color 0.3s, color 0.3s, box-shadow 0.3s;
    }
    .pill i { color: var(--gold); font-size: 0.7rem; }
    .pill:hover { border-color: var(--gold); color: var(--gold); box-shadow: 0 0 12px var(--gold-dim); }

    /* Launch Info Cards */
    .hero-launch-info {
      display: flex; align-items: center; gap: 0; margin: 2rem auto;
      border: 1px solid var(--border); border-radius: 14px; overflow: hidden;
      background: var(--card); backdrop-filter: blur(10px);
      animation: fadeUp 1s 1.1s ease both;
    }
    .launch-card {
      display: flex; align-items: center; gap: 0.9rem;
      padding: 1.2rem 1.8rem;
      transition: background 0.3s;
    }
    .launch-card:hover { background: var(--gold-dim); }
    .launch-card i { font-size: 1.3rem; color: var(--gold); flex-shrink: 0; }
    .launch-card div { display: flex; flex-direction: column; gap: 0.15rem; }
    .launch-card-label {
      font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted);
    }
    .launch-card-value {
      font-size: 0.88rem; color: var(--text); font-weight: 500;
    }
    .launch-divider { width: 1px; height: 40px; background: var(--border); flex-shrink: 0; }

    /* Subscribe */
    .subscribe-row {
      display: flex; gap: 0; max-width: 440px; width: 100%; margin: 2rem auto 0;
      animation: fadeUp 1s 1.2s ease both;
      border: 1px solid var(--border); border-radius: 40px; overflow: hidden;
      background: var(--card); backdrop-filter: blur(10px);
      transition: box-shadow 0.3s;
    }
    .subscribe-row:focus-within {
      box-shadow: 0 0 0 3px var(--gold-dim); border-color: var(--gold);
    }
    .subscribe-row input {
      flex: 1; background: none; border: none; outline: none;
      padding: 0.9rem 1.4rem; color: var(--text); font-size: 0.88rem;
      font-family: 'DM Sans', sans-serif;
    }
    .subscribe-row input::placeholder { color: var(--text-muted); }
    .subscribe-row button {
      padding: 0.9rem 1.6rem; background: var(--gold); color: var(--bg);
      border: none; cursor: pointer;
      font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
      font-family: 'DM Sans', sans-serif; font-weight: 500;
      transition: background 0.3s, transform 0.2s, letter-spacing 0.3s, box-shadow 0.3s;
      border-radius: 0 40px 40px 0; position: relative; overflow: hidden;
    }
    .subscribe-row button::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
      transform: translateX(-100%); transition: transform 0.5s;
    }
    .subscribe-row button:hover {
      background: var(--gold-light); transform: scale(1.03);
      box-shadow: 0 4px 18px var(--gold-dim); letter-spacing: 0.18em;
    }
    .subscribe-row button:hover::after { transform: translateX(100%); }
    .subscribe-row button:active { transform: scale(0.97); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .scroll-hint {
      position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
      color: var(--text-muted); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
      animation: fadeIn 1s 1.8s ease both; cursor: pointer;
    }
    .scroll-hint .arrow {
      width: 20px; height: 20px; border-right: 1px solid var(--gold);
      border-bottom: 1px solid var(--gold); transform: rotate(45deg);
      animation: bounce 1.6s infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: rotate(45deg) translate(0,0); }
      50%       { transform: rotate(45deg) translate(4px,4px); }
    }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

    /* ── ABOUT ── */
    #about { padding: 120px 2rem; background: var(--bg2); }
    .about-inner {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
    }
    .about-label {
      font-size: 0.72rem; letter-spacing: 0.35em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 1.2rem;
    }
    .about-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300;
      line-height: 1.15; color: var(--text);
    }
    .about-title span { color: var(--gold); font-style: italic; }
    .about-text { color: var(--text-muted); line-height: 1.9; font-size: 0.95rem; margin-top: 1.5rem; }
    .about-features { list-style: none; margin-top: 2rem; display: flex; flex-direction: column; gap: 0.8rem; }
    .about-features li {
      display: flex; align-items: center; gap: 0.8rem;
      font-size: 0.88rem; color: var(--text-muted);
    }
    .about-features li .icon-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0;
    }

    .about-visual { display: flex; align-items: center; justify-content: center; position: relative; }
    .about-ring {
      width: min(340px, 80vw); aspect-ratio: 1; border-radius: 50%;
      border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center; position: relative;
      animation: rotateSlow 20s linear infinite;
    }
    @keyframes rotateSlow { to { transform: rotate(360deg); } }
    .about-ring::before {
      content: ''; position: absolute; width: 80%; height: 80%; border-radius: 50%;
      border: 1px dashed var(--border);
    }
    .about-ring-inner {
      width: 65%; height: 65%; border-radius: 50%;
      background: var(--gold-dim);
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 0.3rem;
      animation: rotateSlow 20s linear infinite reverse;
      border: 1px solid var(--border);
    }
    .about-icon-big { font-size: 2.5rem; color: var(--gold); }
    .about-ring-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.9rem; letter-spacing: 0.15em; color: var(--gold); text-align: center;
    }
    .orbit-dot { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }
    .orbit-dot:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
    .orbit-dot:nth-child(2) { bottom: 0; left: 50%; transform: translateX(-50%); }
    .orbit-dot:nth-child(3) { left: 0; top: 50%; transform: translateY(-50%); }
    .orbit-dot:nth-child(4) { right: 0; top: 50%; transform: translateY(-50%); }

    /* ── CONTACT ── */
    #contact { padding: 120px 2rem; background: var(--bg); }
    .section-header { text-align: center; margin-bottom: 4rem; }
    .section-label {
      font-size: 0.72rem; letter-spacing: 0.35em; text-transform: uppercase;
      color: var(--gold); display: block; margin-bottom: 1rem;
    }
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; color: var(--text);
    }
    .section-title em { color: var(--gold); font-style: italic; }

    .contact-inner {
      max-width: 900px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
    }

    .form-group { display: flex; flex-direction: column; gap: 1.2rem; }
    .field { position: relative; }
    .field input, .field textarea {
      width: 100%; background: var(--surface);
      border: 1px solid var(--border); border-radius: 6px;
      padding: 0.9rem 1.2rem; color: var(--text);
      font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
      outline: none; resize: none;
      transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
    }
    .field textarea { height: 130px; }
    .field input::placeholder, .field textarea::placeholder { color: var(--text-muted); }
    .field input:focus, .field textarea:focus {
      border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-dim); background: var(--bg3);
    }

    .btn-primary {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
      padding: 0.9rem 2.2rem; background: var(--gold); color: var(--bg);
      border: none; border-radius: 40px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 0.82rem;
      font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
      position: relative; overflow: hidden;
      transition: background 0.3s, transform 0.25s, box-shadow 0.3s, letter-spacing 0.3s;
    }
    .btn-primary::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 70%);
      opacity: 0; transition: opacity 0.3s;
    }
    .btn-primary:hover {
      background: var(--gold-light); transform: translateY(-3px) scale(1.04);
      box-shadow: 0 10px 30px var(--gold-dim); letter-spacing: 0.2em;
    }
    .btn-primary:hover::before { opacity: 1; }
    .btn-primary:active { transform: translateY(0) scale(0.97); box-shadow: none; }

    .contact-info { display: flex; flex-direction: column; gap: 2.5rem; }
    .info-item { display: flex; flex-direction: column; gap: 0.3rem; }
    .info-label { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); }
    .info-value { color: var(--text-muted); font-size: 0.9rem; }
    .info-value a { color: var(--text-muted); text-decoration: none; transition: color 0.3s; }
    .info-value a:hover { color: var(--gold); }

    .social-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: var(--text); margin-bottom: 1rem; }
    .social-links { display: flex; gap: 1rem; flex-wrap: wrap; }
    .social-link {
      width: 46px; height: 46px; border-radius: 50%;
      border: 1px solid var(--border); background: var(--gold-dim);
      display: flex; align-items: center; justify-content: center;
      color: var(--gold); font-size: 1rem; text-decoration: none;
      position: relative; overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s, border-color 0.3s, color 0.3s, background 0.3s;
    }
    .social-link::before {
      content: ''; position: absolute; inset: 0; border-radius: 50%;
      background: var(--gold); transform: scale(0);
      transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    }
    .social-link i { position: relative; z-index: 1; }
    .social-link:hover {
      transform: translateY(-6px) scale(1.15) rotate(5deg);
      box-shadow: 0 10px 25px var(--gold-dim); border-color: var(--gold); color: var(--bg);
    }
    .social-link:hover::before { transform: scale(1); }
    .social-link:active { transform: scale(0.95); }

    /* ── FOOTER ── */
    footer {
      background: var(--bg2); border-top: 1px solid var(--border);
      padding: 3rem 2rem; text-align: center;
    }
    .footer-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem; font-weight: 300; letter-spacing: 0.2em; color: var(--gold);
      display: block; margin-bottom: 0.5rem;
    }
    .footer-tag { color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.1em; }
    .footer-copy { color: var(--text-muted); font-size: 0.72rem; margin-top: 1.5rem; letter-spacing: 0.05em; opacity: 0.6; }

    /* ── TOAST ── */
    .toast {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
      background: var(--gold); color: var(--bg);
      padding: 0.9rem 1.8rem; border-radius: 40px;
      font-size: 0.85rem; font-weight: 500;
      transform: translateY(80px); opacity: 0;
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s;
      pointer-events: none;
    }
    .toast.show { transform: translateY(0); opacity: 1; }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hamburger { display: flex; }
      .about-inner { grid-template-columns: 1fr; gap: 3rem; }
      .about-visual { order: -1; }
      .about-ring { width: 220px; }
      .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
      .hero-launch-info { flex-direction: column; border-radius: 14px; }
      .launch-divider { width: 80%; height: 1px; }
    }
</style>
</head>
<body>

<canvas id="particles"></canvas>
<div id="progress-bar"></div>
<div class="toast" id="toast"></div>

<!-- NAVBAR -->
<nav id="navbar">
  <a href="#hero" class="nav-logo">KIMORÉ</a>
  <ul class="nav-links">
    <li><a href="#hero">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div style="display:flex;align-items:center;gap:1rem;">
    <button class="theme-toggle" id="themeBtn" aria-label="Toggle theme">
      <i class="fa-solid fa-sun" id="themeIcon"></i>
    </button>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="drawer-overlay" id="drawerOverlay"></div>
<div class="mobile-drawer" id="mobileDrawer">
  <a href="#hero"    onclick="closeDrawer()">Home</a>
  <a href="#about"   onclick="closeDrawer()">About</a>
  <a href="#contact" onclick="closeDrawer()">Contact</a>
</div>

<!-- HERO -->
<section id="hero">
  <p class="hero-eyebrow">✦ A New Era of Style ✦</p>
  <h1 class="hero-title">Something<br><em>COOL</em><br>Is Coming</h1>
  <p class="hero-sub">An exclusive boutique experience curated for those who appreciate elegance, craft, and timeless fashion.</p>

  <div class="gold-line"></div>

  <div class="hero-pills">
    <span class="pill"><i class="fa-solid fa-gem"></i> Street Curation</span>
    <span class="pill"><i class="fa-solid fa-star"></i> Exclusive Pieces</span>
    <span class="pill"><i class="fa-solid fa-leaf"></i> Sustainably Made</span>
  </div>

  <div class="hero-launch-info">
    <div class="launch-card">
      <i class="fa-regular fa-calendar-check"></i>
      <div>
        <span class="launch-card-label">Grand Opening</span>
        <span class="launch-card-value">Coming 2026</span>
      </div>
    </div>
    <div class="launch-divider"></div>
    <div class="launch-card">
      <i class="fa-solid fa-location-dot"></i>
      <div>
        <span class="launch-card-label">Location</span>
        <span class="launch-card-value">Bengaluru, India</span>
      </div>
    </div>
    <div class="launch-divider"></div>
    <div class="launch-card">
      <i class="fa-solid fa-bag-shopping"></i>
      <div>
        <span class="launch-card-label">Experience</span>
        <span class="launch-card-value">Online</span>
      </div>
    </div>
  </div>

  <div class="subscribe-row">
    <input type="email" id="emailInput" placeholder="Your email address…" />
    <button onclick="subscribe()">Notify Me</button>
  </div>

  <div class="scroll-hint" onclick="document.getElementById('about').scrollIntoView({behavior:'smooth'})">
    <div class="arrow"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- ABOUT -->
<section id="about">
  <div class="about-inner">
    <div>
      <p class="about-label reveal">Our Story</p>
      <h2 class="about-title reveal reveal-delay-1">Crafted for the<br><span>Discerning</span> Few</h2>
      <p class="about-text reveal reveal-delay-2">
        Kimoré Labs is more than a store — it is a sanctuary for those who seek beauty in every detail. We are curating a collection that blends modern sensibility with timeless craftsmanship, sourced from artisans who share our passion for excellence.
      </p>
      <ul class="about-features reveal reveal-delay-3">
        <li><span class="icon-dot"></span> Handpicked Cool collections</li>
        <li><span class="icon-dot"></span> Exclusive online experience</li>
        <li><span class="icon-dot"></span> Personalised styling consultations</li>
        <li><span class="icon-dot"></span> Sustainably sourced, ethically made</li>
      </ul>
    </div>
    <div class="about-visual reveal reveal-delay-2">
      <div class="about-ring">
        <span class="orbit-dot"></span>
        <span class="orbit-dot"></span>
        <span class="orbit-dot"></span>
        <span class="orbit-dot"></span>
        <div class="about-ring-inner">
          <i class="fa-solid fa-gem about-icon-big"></i>
          <span class="about-ring-text">Est. 2026</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="section-header">
    <span class="section-label reveal">Get in Touch</span>
    <h2 class="section-title reveal reveal-delay-1">Let's <em>Connect</em></h2>
  </div>
  <div class="contact-inner">
    <div class="form-group reveal reveal-delay-1">
      <div class="field"><input type="text" id="fname" placeholder="Your Name" /></div>
      <div class="field"><input type="email" id="femail" placeholder="Email Address" /></div>
      <div class="field"><textarea id="fmsg" placeholder="Your Message…"></textarea></div>
      <button class="btn-primary" onclick="sendMessage()">
        <i class="fa-solid fa-paper-plane"></i> Send Message
      </button>
    </div>
    <div class="contact-info reveal reveal-delay-2">
      <div class="info-item">
        <span class="info-label">Location</span>
        <span class="info-value">Banglore-India</span>
      </div>
      <div class="info-item">
        <span class="info-label">Email</span>
        <span class="info-value"><a href="mailto:hello@Kimorelabs.in">hello@Kimorelabs.in</a></span>
      </div>
      <div class="info-item">
        <span class="info-label">Phone</span>
        <span class="info-value">+91 12345 67890</span>
      </div>
      <div>
        <p class="social-title">Follow Our Journey</p>
        <div class="social-links">
          <a href="#" class="social-link" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="social-link" target="_blank" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" class="social-link" target="_blank" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
          <a href="#" class="social-link" target="_blank" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
          <a href="#" class="social-link" target="_blank" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <span class="footer-logo">Kimoré</span>
  <p class="footer-tag">Where elegance meets intention.</p>
  <p class="footer-copy">© 2025 Kimoré Labs. All rights reserved.</p>
</footer>

<script src="script.js">
     /* Theme Toggle */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  themeBtn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  });

  /* Navbar scroll */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = pct + '%';
  });

  /* Hamburger / Drawer */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');
  const overlay   = document.getElementById('drawerOverlay');
  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
  });
  overlay.addEventListener('click', closeDrawer);

  /* Toast */
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  /* Subscribe */
  function subscribe() {
    const val = document.getElementById('emailInput').value.trim();
    if (!val || !val.includes('@')) { showToast('⚠ Please enter a valid email.'); return; }
    document.getElementById('emailInput').value = '';
    showToast("✨ You're on the list! We'll be in touch.");
  }

  /* Contact Form */
  function sendMessage() {
    const n = document.getElementById('fname').value.trim();
    const e = document.getElementById('femail').value.trim();
    const m = document.getElementById('fmsg').value.trim();
    if (!n || !e || !m) { showToast('⚠ Please fill all fields.'); return; }
    document.getElementById('fname').value  = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmsg').value   = '';
    showToast("✉ Message sent! We'll respond soon.");
  }

  /* Scroll Reveal */
  const reveals  = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => observer.observe(r));

  /* Particles */
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
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
</script>
</body>
</html>








========================================================





<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAzqlIiBZfJ7SzVOYSConOM1q594b3c-8M",
    authDomain: "kimore.firebaseapp.com",
    projectId: "kimore",
    storageBucket: "kimore.firebasestorage.app",
    messagingSenderId: "276399876050",
    appId: "1:276399876050:web:cc3aba1b8b7cc6d4ad4a0b",
    measurementId: "G-BHR060JEFQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>










npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzqlIiBZfJ7SzVOYSConOM1q594b3c-8M",
  authDomain: "kimore.firebaseapp.com",
  projectId: "kimore",
  storageBucket: "kimore.firebasestorage.app",
  messagingSenderId: "276399876050",
  appId: "1:276399876050:web:cc3aba1b8b7cc6d4ad4a0b",
  measurementId: "G-BHR060JEFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




npm install -g firebase-tools

firebase login
firebase init
firebase deploy
