/* Tunggu hingga DOM fully loaded sebelum menjalankan kode yang mengakses elemen */
document.addEventListener("DOMContentLoaded", () => {
  /* Ambil elemen-elemen yang diperlukan */
  const navbar = document.getElementById("navbar");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  /* Efek scroll untuk navbar - menambah shadow saat scroll */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /*  Toggle mobile menu - buka/tutup menu hamburger */
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  /* Tutup mobile menu saat mengklik link navigasi */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenuToggle) {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  /*  Fungsi untuk update link aktif berdasarkan scroll position */
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100; /* Offset untuk navbar*/

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      /* Cek apakah scroll position berada di dalam section ini*/
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          /* Tambah class active pada link yang sesuai*/
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  /* Jalankan fungsi updateActiveLink saat scroll*/
  window.addEventListener("scroll", updateActiveLink);

  /* Enhanced smooth scrolling untuk navigasi*/
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); /* Cegah default behavior*/
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offsetTop = target.offsetTop - 80; /* Offset untuk navbar*/

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

        /* Mulai animasi*/
        requestAnimationFrame(animation);
      }
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
