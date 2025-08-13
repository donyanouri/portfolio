document.addEventListener('DOMContentLoaded', function () {
  // Popup image modal
  document.querySelectorAll('.popup-img').forEach(function(img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      document.getElementById('modalImg').src = img.src;
      var modal = new bootstrap.Modal(document.getElementById('imgModal'));
      modal.show();
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