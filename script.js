const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('in-view');
      target.addEventListener('animationend', () => target.classList.remove('in-view'), { once: true });
      revealObserver.unobserve(target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.service-card, .package-card, .steps, .contact-panel').forEach(panel => {
    revealObserver.observe(panel);
  });
}
