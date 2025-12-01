// Toggle navbar menu manually (for better control)
const toggleBtn = document.getElementById("menuToggle");
const navMenu = document.getElementById("mainNav");
const dropdownToggle = document.getElementById("servicesMenu");

// Collapse / expand on mobile click
toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Simple dropdown toggle for mobile view
dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    dropdownToggle.nextElementSibling.classList.toggle("show");
});

// Automatically change slides every 4 seconds
const heroCarousel = document.querySelector('#heroCarousel');
const carousel = new bootstrap.Carousel(heroCarousel, {
  interval: 4000,
  ride: 'carousel'
});

// Auto-change images every 7.5 seconds
const featureCarousel = document.querySelector('#featureCarousel');
new bootstrap.Carousel(featureCarousel, {
    interval: 7500, // 7.5 seconds
    ride: 'carousel'
});

// Optional: Glow hover effect (not required but enhances premium feel)
document.querySelectorAll('.about-box').forEach(box => {
    box.addEventListener('mouseenter', () => box.classList.add('glow'));
    box.addEventListener('mouseleave', () => box.classList.remove('glow'));
});

document.querySelectorAll(".social-icons i").forEach(icon => {
    icon.addEventListener("mouseover", () => icon.style.transform = "scale(1.2)");
    icon.addEventListener("mouseout", () => icon.style.transform = "scale(1)");
});
