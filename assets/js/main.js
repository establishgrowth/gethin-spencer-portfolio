/* ==========================================================================
   GETHIN SPENCER — PORTFOLIO SCRIPT
   Vanilla JS. No build step, no dependencies. Handles:
     1. Sticky header shadow state
     2. Mobile navigation toggle
     3. Scrollspy (active nav link)
     4. Smooth-scroll close of mobile menu on link click
     5. Portfolio category tabs (accessible tablist pattern)
     6. Scroll-reveal animation (respects prefers-reduced-motion)
     7. Placeholder CTA messaging (CV / LinkedIn / Email / YouTube)
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     1. Sticky header shadow
     --------------------------------------------------------------------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------------------------------------------------------------
     2. Mobile navigation toggle
     --------------------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  function closeMobileNav() {
    navToggle.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }

  navToggle.addEventListener("click", function () {
    var isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  /* ---------------------------------------------------------------------
     3. Scrollspy — highlight the nav link for the section in view
     --------------------------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      var isMatch = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isMatch);
      if (isMatch) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------------------------------------------------------------------
     4. Scroll-reveal
     --------------------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------------------
     5. Portfolio tabs (WAI-ARIA tabpanel pattern)
     --------------------------------------------------------------------- */
  var tabButtons = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));
  var panels = {
    video: document.getElementById("panel-video"),
    audio: document.getElementById("panel-audio"),
    written: document.getElementById("panel-written"),
    social: document.getElementById("panel-social")
  };

  function activateTab(button, focusButton) {
    tabButtons.forEach(function (btn) {
      var selected = btn === button;
      btn.setAttribute("aria-selected", String(selected));
      btn.tabIndex = selected ? 0 : -1;
    });
    Object.keys(panels).forEach(function (key) {
      panels[key].hidden = panels[key].id !== "panel-" + button.dataset.category;
    });
    if (focusButton) button.focus();
  }

  tabButtons.forEach(function (button, index) {
    button.addEventListener("click", function () { activateTab(button, false); });

    button.addEventListener("keydown", function (e) {
      var newIndex = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        newIndex = (index + 1) % tabButtons.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      } else if (e.key === "Home") {
        newIndex = 0;
      } else if (e.key === "End") {
        newIndex = tabButtons.length - 1;
      }
      if (newIndex !== null) {
        e.preventDefault();
        activateTab(tabButtons[newIndex], true);
      }
    });
  });

  /* ---------------------------------------------------------------------
     5b. Live site preview — the iframe renders at a desktop width (1280px)
     and is scaled down to fit its frame, so the embedded site looks like a
     miniature browser window at any screen size.
     --------------------------------------------------------------------- */
  document.querySelectorAll("[data-site-frame]").forEach(function (view) {
    var frame = view.querySelector("iframe");
    if (!frame) return;
    function fit() {
      var w = view.clientWidth;
      if (w) frame.style.transform = "scale(" + w / 1280 + ")";
    }
    fit();
    if ("ResizeObserver" in window) {
      new ResizeObserver(fit).observe(view);
    } else {
      window.addEventListener("resize", fit);
    }
  });

  /* ---------------------------------------------------------------------
     6. Placeholder CTA messaging
     Buttons for CV / LinkedIn / Email / YouTube are real interactive
     elements but the underlying asset/link has not been supplied yet.
     Rather than a dead link, surface a clear, polite inline message.
     --------------------------------------------------------------------- */
  var placeholderCopy = {
    CV: "The CV download will be available once Gethin's CV PDF is added to /assets/documents."
  };

  var ctaNote = document.getElementById("cta-note");
  var contactNote = document.getElementById("contact-note");

  document.querySelectorAll("[data-placeholder-cta]").forEach(function (el) {
    el.addEventListener("click", function () {
      var key = el.getAttribute("data-placeholder-cta");
      var message = placeholderCopy[key] || "Coming soon.";
      var target = el.closest("#contact") ? contactNote : ctaNote;
      if (target) target.textContent = message;
    });
  });
})();
