document.addEventListener('DOMContentLoaded', function () {
  // Accordion modal logic
   document.querySelectorAll('.accordion-button[data-modal-id]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
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

  // Dynamic navbar active state based on scroll position
  const sections = ['custom-header', 'about', 'work', 'contact'];
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function setActiveNav() {
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
});