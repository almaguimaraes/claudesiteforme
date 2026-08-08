(function () {
  "use strict";

  /* ================= MOBILE NAV ================= */

  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });

    // Close menu when clicking navigation links
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
  }


  /* ================= SCROLL REVEAL ================= */

  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }


  /* ================= LIGHTBOX ================= */

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var galleryItems = document.querySelectorAll(".gallery-item");


  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) {
      return;
    }

    lightboxImg.src = src;
    lightboxImg.alt = alt || "";

    lightbox.classList.add("active");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";
  }


  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("active");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";
  }


  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var full = item.getAttribute("data-full");
      var img = item.querySelector("img");

      if (item.classList.contains("img-empty")) {
        return;
      }

      openLightbox(
        full,
        img ? img.alt : ""
      );
    });
  });


  if (lightboxClose) {
    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );
  }


  if (lightbox) {
    lightbox.addEventListener(
      "click",
      function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      }
    );
  }


  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Escape") {
        closeLightbox();
      }
    }
  );


  /* ================= NAV SCROLL ================= */

  var nav = document.getElementById("nav");

  function updateNav() {
    if (!nav) {
      return;
    }

    var y =
      window.scrollY ||
      window.pageYOffset;

    nav.style.borderBottomColor =
      y > 40
        ? "rgba(243,236,221,0.16)"
        : "rgba(243,236,221,0.10)";
  }

  window.addEventListener(
    "scroll",
    updateNav,
    { passive: true }
  );

  updateNav();


  /* ================= LANGUAGE ================= */

  var languageToggle =
    document.getElementById("languageToggle");

  var currentLanguage =
    localStorage.getItem("alma-language") || "pt";


  function setLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang =
      language === "pt"
        ? "pt-PT"
        : "en";


    document
      .querySelectorAll("[data-pt][data-en]")
      .forEach(function (element) {
        var translated =
          element.getAttribute(
            "data-" + language
          );

        if (translated !== null) {
          element.innerHTML = translated;
        }
      });


    if (languageToggle) {
      languageToggle.textContent =
        language === "pt"
          ? "EN"
          : "PT";

      languageToggle.setAttribute(
        "aria-label",
        language === "pt"
          ? "Mudar para inglês"
          : "Mudar para português"
      );
    }


    localStorage.setItem(
      "alma-language",
      language
    );
  }


  if (languageToggle) {
    languageToggle.addEventListener(
      "click",
      function () {
        setLanguage(
          currentLanguage === "pt"
            ? "en"
            : "pt"
        );

        // Close mobile menu after changing language
        if (links && toggle) {
          links.classList.remove("open");

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      }
    );
  }


  /* Start in saved language */

  setLanguage(currentLanguage);


  /* ================= FOOTER YEAR ================= */

  var yearEl =
    document.getElementById("year");

  if (yearEl) {
    yearEl.textContent =
      new Date().getFullYear();
  }

})();
