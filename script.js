const navbar = document.getElementById("mainNavbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.remove("scrolled");
    navbar.classList.add("transparent");
  }
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
  let current = "";
  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ===== Close mobile nav on link click =====
const navbarCollapse = document.getElementById("navbarNav");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (navbarCollapse.classList.contains("show")) {
      bootstrap.Collapse.getInstance(navbarCollapse).hide();
    }
  });
});

// ===== Skills tab switching =====
function switchTab(tab) {
  document.querySelectorAll(".skills-content").forEach(function (content) {
    content.style.display = "none";
  });
  document.getElementById(tab).style.display = "block";

  document.querySelectorAll(".skills-tab-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  document.querySelector('[data-tab="' + tab + '"]').classList.add("active");

  // Re-trigger fade-in for newly visible cards
  document.querySelectorAll("#" + tab + " .fade-in").forEach(function (el) {
    el.classList.remove("visible");
    setTimeout(function () {
      el.classList.add("visible");
    }, 100);
  });
}

// ===== Scroll animations (Intersection Observer) =====
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add("visible");
        }, index * 80);
      }
    });
  },
  { threshold: 0.15 },
);

fadeElements.forEach(function (el) {
  observer.observe(el);
});

// ===== Counter animation =====
const statNumbers = document.querySelectorAll(".stat-number");
const counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-count"));
        let count = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(function () {
          count += increment;
          if (count >= target) {
            entry.target.textContent = target + "+";
            clearInterval(timer);
          } else {
            entry.target.textContent = count;
          }
        }, 40);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

statNumbers.forEach(function (el) {
  counterObserver.observe(el);
});

// ===== Back to top =====
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Contact form =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var alert = document.getElementById("formAlert");
  alert.style.display = "block";
  alert.className = "mt-3 alert alert-success";
  alert.innerHTML =
    '<i class="bi bi-check-circle-fill me-2"></i>Message sent successfully! I\'ll get back to you soon.';
  this.reset();
  setTimeout(function () {
    alert.style.display = "none";
  }, 5000);
});
