document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const hamburger = document.getElementById("hamburger");

  /* Efek scroll untuk navbar - menambah shadow saat scroll */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* Fungsi untuk update link aktif menggunakan IntersectionObserver */
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -50% 0px", // Navbar offset dan threshold 50%
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }, observerOptions);

    // Observe semua sections
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  updateActiveLink();

  /* Enhanced smooth scrolling untuk navigasi*/
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); /* Cegah default behavior*/
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offsetTop = target.offsetTop - 80; 

        /* Custom smooth scroll dengan durasi yang lebih panjang*/
        const startPosition = window.pageYOffset;
        const distance = offsetTop - startPosition;
        const duration =
          Math.abs(distance) > 1000
            ? 1500
            : 1000; /* Durasi lebih lama untuk jarak jauh*/
        let start = null;

        /* Fungsi animasi scroll*/
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuad(
            timeElapsed,
            startPosition,
            distance,
            duration
          );
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        /* Easing function untuk animasi yang halus*/
        function easeInOutQuad(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      }
    });
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'99c1cd3cc61d1edc',t:'MTc2MjczODQwNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
