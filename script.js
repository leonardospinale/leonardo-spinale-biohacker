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

  document.querySelectorAll('.service-card, .package-card, .contact-panel').forEach(panel => {
    revealObserver.observe(panel);
  });
}

const promo = document.querySelector('.promo-banner');
const promoStart = Date.parse('2026-11-21T00:00:00+01:00');
const promoEnd = Date.parse('2027-01-07T00:00:00+01:00');
const now = Date.now();
promo.hidden = now < promoStart || now >= promoEnd;

const header = document.querySelector('.header');
const updateHeaderHeight = () => {
  document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
};
updateHeaderHeight();
if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(header);
