 /* ─ Navbar scroll ─ */
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ─ Hamburger / Drawer ─ */
  const ham = document.getElementById('hamburger');
  const drawer = document.getElementById('navDrawer');
  const overlay = document.getElementById('drawerOverlay');
  function closeDrawer() {
    ham.classList.remove('open');
    drawer.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
  ham.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    ham.classList.toggle('open', open);
    overlay.style.display = open ? 'block' : 'none';
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-link').forEach(a => a.addEventListener('click', closeDrawer));

  /* ─ Scroll reveal ─ */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ─ Form submit ─ */
  function handleSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
    e.target.reset();
  }
