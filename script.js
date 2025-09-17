// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to various elements
  const fadeElements = document.querySelectorAll(
    ".section-header, .project-card, .skill-category, .contact-item, .reference-card"
  );
  fadeElements.forEach((el, index) => {
    el.classList.add("fade-in");
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Add slide animations to about section
  const aboutText = document.querySelector(".about-text");
  const aboutImage = document.querySelector(".about-image");

  if (aboutText) {
    aboutText.classList.add("slide-in-left");
    observer.observe(aboutText);
  }

  if (aboutImage) {
    aboutImage.classList.add("slide-in-right");
    observer.observe(aboutImage);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const fullHTML = heroTitle.innerHTML;
    heroTitle.innerHTML = "";
    heroTitle.style.opacity = "1";

    let i = 0;
    let isTag = false;
    let currentText = "";

    const typeWriter = () => {
      if (i < fullHTML.length) {
        const char = fullHTML.charAt(i);
        currentText += char;

        if (char === "<") isTag = true;
        if (char === ">") isTag = false;

        heroTitle.innerHTML = currentText;

        i++;
        setTimeout(typeWriter, isTag ? 0 : 50);
      }
    };

    setTimeout(typeWriter, 500);
  }
});


// Skill tags hover effect
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Project cards tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function (e) {
    this.style.transform = "translateY(-5px) rotateX(5deg)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateX(0)";
  });
});

// Contact form validation (if you add a form later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Scroll to top functionality
let scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.opacity = "1";
    scrollToTopBtn.style.visibility = "visible";
  } else {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.visibility = "hidden";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Performance optimization: Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="placeholder.svg"]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.3s ease";

        setTimeout(() => {
          img.style.opacity = "1";
        }, 100);

        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Console welcome message
console.log(`
🚀 Welcome to Josef Struchlak's Portfolio!
📧 Contact: jstruchlak@gmail.com
🔗 Let's connect and build something amazing together!
`);
