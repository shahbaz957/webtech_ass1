/**
 * MindVault — main behaviour
 * Phase 0: mobile navigation only.
 * Later phases will add page-specific functions here, one clear purpose each.
 */

function setupNav() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });

  var links = nav.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      nav.classList.remove("open");
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setupNav();
});
