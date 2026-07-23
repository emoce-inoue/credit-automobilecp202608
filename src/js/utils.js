(() => {
  const viewport = document.querySelector('meta[name="viewport"]');
  const switchViewport = () => {
    const value = window.outerWidth > 360 ? 'width=device-width,initial-scale=1' : 'width=360';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  };
  window.addEventListener('resize', switchViewport);
  switchViewport();
})();

document.addEventListener('DOMContentLoaded', () => {
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
      }
    });
  };
  const defaultObserverOptions = {
    threshold: 0.1,
  };
  const defaultObserver = new IntersectionObserver(observerCallback, defaultObserverOptions);
  const targetElements = document.querySelectorAll('.js-fadeup');
  targetElements.forEach((target) => {
    defaultObserver.observe(target);
  });

  const anchorLinks = document.querySelectorAll('.js-anchor-link');
  const links = document.querySelectorAll('.js-scroll-link');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');

      if (!href || href === '#' || !href.startsWith('#')) {
        return;
      }

      const targetElement = document.querySelector(href);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      const visibleAnchorLink = Array.from(anchorLinks).find((anchorLink) => anchorLink.offsetParent !== null);

      const anchorLinkHeight = visibleAnchorLink ? visibleAnchorLink.offsetHeight : 0;

      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - anchorLinkHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
});
