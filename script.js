document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.popup-img').forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        document.getElementById('modalImg').src = img.src;
        var modal = new bootstrap.Modal(document.getElementById('imgModal'));
        modal.show();
      });
    });
  });