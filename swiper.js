const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
let swiper; // Declare swiper in global scope
let autoplayEnabled = window.innerWidth < 1024;

document.addEventListener("DOMContentLoaded", () => {
  swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty("--progress", 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      }
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: 3,
        centeredSlides: false,
        //  control it manually
      },
    },
  });

  // Initial autoplay control based on screen size
  if (!autoplayEnabled) {
    swiper.autoplay.stop();
  }
});

// Listen for resize and manually control autoplay
window.addEventListener("resize", () => {
  if (!swiper) return; // Make sure swiper is initialized
  
  const isMobile = window.innerWidth < 1024;
  
  if (isMobile && !autoplayEnabled) {
    // Enable autoplay for mobile/tablet
    swiper.autoplay.start();
    autoplayEnabled = true;
  } else if (!isMobile && autoplayEnabled) {
    // Disable autoplay for desktop
    swiper.autoplay.stop();
    autoplayEnabled = false;
  }
});