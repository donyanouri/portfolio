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

  // Dynamic navbar active state based on scroll position and page
  const sections = ['custom-header', 'about', 'work', 'contact'];
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function setActiveNav() {
    // If we are on a project page, make Work link active
    const path = window.location.pathname.replace(/^.*[\\/]/, '');
    const projectPages = ['pinkie.html', 'tobii.html', 'temgroup.html', 'petclinic.html', 'nightlist.html', 'budi.html', 'lightstep.html', 'pharmacy.html', 'mehrarad.html'];
    if (projectPages.includes(path)) {
      navLinks.forEach(link => link.classList.remove('active'));
      const workLink = document.querySelector('.navbar-nav .nav-link[href="#work"]');
      if (workLink) workLink.classList.add('active');
      return;
    }

    let index = sections.length - 1;
    for (let i = 0; i < sections.length; i++) {
      const section = document.getElementById(sections[i]) || document.querySelector('.' + sections[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          index = i;
        }
      }
    }
    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[index]) navLinks[index].classList.add('active');
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

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
});