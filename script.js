function toggleMenu() {
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('menuOverlay');

  menu.classList.toggle('open');
  if (menu.classList.contains('open')) {
    overlay.hidden = false;
  } else {
    overlay.hidden = true;
  }
}

function closeMenu() {
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('menuOverlay');
  menu.classList.remove('open');
  overlay.hidden = true;
}

window.addEventListener('load', function () {
  const links = document.querySelectorAll('#menu a');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('menuOverlay');

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      overlay.hidden = true;
    });
  });
});