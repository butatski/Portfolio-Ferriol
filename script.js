/* =========================================================
   script.js
   - Switches between the three pages (Home, Personal Info, Education)
   - Previous / Next buttons and left / right arrow keys
   - Keeps the page from scrolling (every page fits the screen)
   ========================================================= */
(function () {
  'use strict';

  // The pages, in order. Each one is a <section id="v-NAME"> in index.html.
  var pages = ['home', 'personal', 'education'];

  var tabs = document.querySelectorAll('.tab');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var counter = document.getElementById('count');

  // Block mouse-wheel and touch scrolling so the page never scrolls.
  ['wheel', 'touchmove'].forEach(function (type) {
    document.addEventListener(type, function (e) { e.preventDefault(); }, { passive: false });
  });
  window.addEventListener('scroll', function () { window.scrollTo(0, 0); });

  // Turn a Previous/Next button on (with a link) or off (greyed out).
  function setButton(button, target) {
    if (target) {
      button.setAttribute('href', '#' + target);
      button.removeAttribute('aria-disabled');
      button.removeAttribute('tabindex');
      button.classList.remove('off');
    } else {
      button.removeAttribute('href');
      button.setAttribute('aria-disabled', 'true');
      button.setAttribute('tabindex', '-1');
      button.classList.add('off');
    }
  }

  // The current page comes from the address (#home, #personal, #education).
  function currentPage() {
    var name = (location.hash || '').replace('#', '');
    return pages.indexOf(name) < 0 ? 'home' : name;
  }

  // Show one page, hide the others, and update tabs, buttons and counter.
  function show() {
    var current = currentPage();
    var index = pages.indexOf(current);

    pages.forEach(function (name) {
      var view = document.getElementById('v-' + name);
      var isCurrent = name === current;
      view.hidden = !isCurrent;
      view.classList.remove('enter');
      if (isCurrent) {
        void view.offsetWidth;          // restart the slide-in animation
        view.classList.add('enter');
      }
    });

    tabs.forEach(function (tab) {
      if (tab.getAttribute('data-view') === current) {
        tab.setAttribute('aria-current', 'page');
      } else {
        tab.removeAttribute('aria-current');
      }
    });

    setButton(prevBtn, pages[index - 1]);
    setButton(nextBtn, pages[index + 1]);
    counter.textContent = (index + 1) + ' / ' + pages.length;
  }

  // Left and right arrow keys move between pages.
  document.addEventListener('keydown', function (e) {
    var index = pages.indexOf(currentPage());
    if (e.key === 'ArrowRight' && pages[index + 1]) location.hash = pages[index + 1];
    if (e.key === 'ArrowLeft' && pages[index - 1]) location.hash = pages[index - 1];
  });

  window.addEventListener('hashchange', show);
  show();
})();
