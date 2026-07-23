const triggerModal = () => {
  const openButtons = document.querySelectorAll('.l-entry__button');
  const modal = document.querySelector('.l-modal');
  const closeButton = modal?.querySelector('.l-modal__close');

  if (!openButtons.length || !modal || !closeButton) {
    return;
  }
  const openModal = () => {
    modal.showModal();
    modal.classList.add('l-modal--show');
    document.body.classList.add('l-body--modal');
  };

  const closeModal = () => {
    modal.classList.remove('l-modal--show');
    modal.close();
    document.body.classList.remove('l-body--modal');
  };

  openButtons.forEach((openButton) => {
    openButton.addEventListener('click', openModal);
  });

  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modal.addEventListener('close', () => {
    modal.classList.remove('l-modal--show');
    document.body.classList.remove('l-body--modal');
  });
};

const triggerStickyEntry = () => {
  const mv = document.querySelector('.l-mv');
  const normalEntry = document.querySelector('.l-entry');
  const stickyEntry = document.querySelector('.l-sticky-entry');

  if (!mv || !normalEntry || !stickyEntry) {
    return;
  }

  let mvPassed = false;
  let entryReached = false;

  const updateStickyEntry = () => {
    const shouldShow = mvPassed && !entryReached;

    stickyEntry.classList.toggle('l-sticky-entry--fixed', shouldShow);
    stickyEntry.setAttribute('aria-hidden', String(!shouldShow));
    stickyEntry.inert = !shouldShow;
  };

  const mvObserver = new IntersectionObserver(
    ([entry]) => {
      mvPassed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;

      updateStickyEntry();
    },
    {
      threshold: 0,
    },
  );

  const entryObserver = new IntersectionObserver(
    ([entry]) => {
      entryReached = entry.isIntersecting || entry.boundingClientRect.top <= 0;

      updateStickyEntry();
    },
    {
      threshold: 0,
    },
  );

  mvObserver.observe(mv);
  entryObserver.observe(normalEntry);
};

document.addEventListener('DOMContentLoaded', () => {
  triggerModal();
  triggerStickyEntry();
});
