// Responsive nav toggle and scroll/fade effects
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = navLinks.querySelectorAll('a');
  const sections = document.querySelectorAll('section[id], footer[id]');

  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('is-open');
      navLinks.classList.toggle('show', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close menu when clicking a nav link
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      menuToggle.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });

  // Close menu when pressing Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('show');
      menuToggle.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', false);
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('show');
      menuToggle.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', false);
    }
  });

  // Smooth scroll and active nav highlighting
  const linkMap = {};
  navLinkItems.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    if (id) linkMap[id] = link;
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Highlight nav link
            navLinkItems.forEach(l => l.classList.remove('active'));
            if (linkMap[entry.target.id]) {
              linkMap[entry.target.id].classList.add('active');
            }

            // Fade in sections
            if (entry.target.classList.contains('reveal')) {
              entry.target.classList.add('is-visible');
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach(section => {
      if (section.classList.contains('reveal')) section.classList.add('reveal');
      observer.observe(section);
    });
  } else {
    // Fallback for old browsers
    sections.forEach(section => section.classList.add('is-visible'));
  }
});
