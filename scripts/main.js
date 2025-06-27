tailwind.config = {
  theme: {
    extend: {
      colors: {
        "brand-yellow": "#E0FF00",
        "brand-orange-start": "#F9B513",
        "brand-orange-end": "#EA601E",
      },
      fontFamily: {
        "inter-tight": ["Inter Tight", "sans-serif"],
      },
    },
  },
};
// Slider functionality
const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");
// Mobile menu toggle functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

mobileMenuButton.addEventListener("click", function () {
  // Toggle mobile menu
  mobileMenu.classList.toggle("active");

  // Toggle icons
  if (mobileMenu.classList.contains("active")) {
    menuIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
});

// Close mobile menu when clicking on menu items
const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  if (
    !mobileMenuButton.contains(event.target) &&
    !mobileMenu.contains(event.target)
  ) {
    mobileMenu.classList.remove("active");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
});

let currentSlide = 0;
const slideWidth = 200; // 192px (w-48) + 16px gap
const totalSlides = 5;

// Update dots
function updateDots() {
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.remove("bg-gray-300");
      dot.classList.add("bg-blue-500");
    } else {
      dot.classList.remove("bg-blue-500");
      dot.classList.add("bg-gray-300");
    }
  });
}

// Go to specific slide
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  slider.scrollTo({
    left: slideIndex * slideWidth,
    behavior: "smooth",
  });
  updateDots();
}

// Next slide
function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  goToSlide(currentSlide);
}

// Previous slide
function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 1;
  }
  goToSlide(currentSlide);
}

// Event listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

// Touch/swipe support
let startX = 0;
let scrollLeft = 0;

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener("touchend", () => {
  const newSlide = Math.round(slider.scrollLeft / slideWidth);
  currentSlide = Math.max(0, Math.min(newSlide, totalSlides - 1));
  goToSlide(currentSlide);
});

// Auto-play (optional)
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Start auto-play
startAutoPlay();

// Pause auto-play on hover
slider.addEventListener("mouseenter", stopAutoPlay);
slider.addEventListener("mouseleave", startAutoPlay);

// Pause auto-play on touch
slider.addEventListener("touchstart", stopAutoPlay);
slider.addEventListener("touchend", () => {
  setTimeout(startAutoPlay, 3000);
});

const button = document.getElementById("languageButton");
const dropdown = document.getElementById("languageDropdown");
const arrow = document.getElementById("dropdownArrow");

// Dropdown ochish/yopish
button.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
  arrow.classList.toggle("rotate-180");
});

// Tashqarida bosilganda yopish
document.addEventListener("click", (e) => {
  if (!button.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add("hidden");
    arrow.classList.remove("rotate-180");
  }
});

// Til tanlash funksiyasi
function selectLanguage(value, flagSrc, text) {
  document.getElementById("selectedFlag").src = flagSrc;
  document.getElementById("selectedText").textContent = text;
  dropdown.classList.add("hidden");
  arrow.classList.remove("rotate-180");

  // Bu yerda til o'zgarishi logikasini qo'shishingiz mumkin
  console.log("Tanlangan til:", value);
}
