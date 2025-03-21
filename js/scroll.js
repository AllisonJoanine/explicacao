document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".reveal");
  
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          el.classList.add("active");
        }
      });
    };
  
    // Reveals on scroll and on load
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
  });
  