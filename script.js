document.addEventListener('DOMContentLoaded', function () {
  // Accordion modal logic
  document.querySelectorAll('.accordion-button[data-modal-id]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var modalId = btn.getAttribute('data-modal-id');
      var content = document.getElementById('modalContent-' + modalId);
      if (content) {
        document.getElementById('modalInner').innerHTML = content.innerHTML;
        // Swap text and image order in modalInner
        const modalInner = document.getElementById('modalInner');
        const row = modalInner.querySelector('.row');
        if (row) {
          const cols = row.querySelectorAll('.col-md-6, .col-md-9, .col-md-10, .col-md-11, .col-md-12');
          if (cols.length === 2) {
            // Move text column before image column
            row.insertBefore(cols[1], cols[0]);
          }
        }
        var modal = new bootstrap.Modal(document.getElementById('imgModal'));
        modal.show();
      }
    });
  });

  // Keep section navigation expressive without fighting native anchor behavior.
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('main [id]');
  const sectionLinks = [...navLinks].filter(link => link.getAttribute('href')?.startsWith('#'));
  if (sections.length && sectionLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const path = window.location.pathname.replace(/^.*[\\/]/, '');
  const projectPages = ['wsocial.html', 'mushylab.html', 'pinkie.html', 'tobii.html', 'temgroup.html', 'petclinic.html', 'studiomosaic.html', 'nightlist.html', 'budi.html', 'lightstep.html', 'pharmacy.html', 'mehrarad.html'];
  if (projectPages.includes(path)) {
    navLinks.forEach(link => link.classList.toggle('active', link.textContent.trim().toLowerCase() === 'work'));
  }

  // New: project image modal handler
  document.querySelectorAll('.project-image').forEach(function(img) {
    img.addEventListener('click', function() {
      const full = img.getAttribute('data-full') || img.src;
      const modalImg = document.getElementById('projectModalImg');
      const modalTitle = document.getElementById('projectModalTitle');
      if (modalImg) modalImg.src = full;
      if (modalImg) modalImg.alt = img.alt || '';
      if (modalTitle) modalTitle.textContent = img.alt || '';
      const modalEl = document.getElementById('projectImgModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }
    });

    // keyboard accessibility: Enter or Space opens modal
    img.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        img.click();
      }
    });
  });

  // Make "Work" link behave: same-page -> scroll to #work, other pages -> go to index.html#work
  document.querySelectorAll('a.dropdown-item[href*="#work"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      // allow modifier / middle-clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const currentFile = window.location.pathname.replace(/^.*[\\/]/, '') || 'index.html';
      const isIndex = currentFile === '' || currentFile === 'index.html';
      const href = link.getAttribute('href') || '';

      if (isIndex) {
        // same page: prevent navigation and scroll smoothly to #work
        if (href.includes('#work')) {
          e.preventDefault();
          const target = document.getElementById('work');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // update hash without jumping (keeps history)
            history.replaceState(null, '', '#work');
          } else {
            // fallback: set hash
            window.location.hash = '#work';
          }
        }
      } else {
        // on another page: ensure we navigate to index.html#work
        const dest = 'index.html#work';
        if (href !== dest) {
          e.preventDefault();
          window.location.href = dest;
        }
        // if href already equals dest, allow default navigation
      }
    });
  });

  // Make "About" link behave: same-page -> scroll to #about, other pages -> go to index.html#about
  document.querySelectorAll('a.nav-link[href="#about"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      // allow modifier / middle-clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const currentFile = window.location.pathname.replace(/^.*[\\/]/, '') || 'index.html';
      const isIndex = currentFile === '' || currentFile === 'index.html';

      if (isIndex) {
        // same page: prevent navigation and scroll smoothly to #about
        e.preventDefault();
        const target = document.getElementById('about');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#about');
        } else {
          window.location.hash = '#about';
        }
      } else {
        // on another page: navigate to index.html#about
        e.preventDefault();
        window.location.href = 'index.html#about';
      }
    });
  });
});