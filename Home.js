// -------------------- AUTO SLIDE: HERO CAROUSEL --------------------
const heroCarousel = document.querySelector('#heroCarousel');
if (heroCarousel) {
  new bootstrap.Carousel(heroCarousel, {
    interval: 3000, // 4 seconds
    ride: 'carousel'
  });
}

// -------------------- AUTO SLIDE: FEATURE CAROUSEL --------------------
const featureCarousel = document.querySelector('#featureCarousel');
if (featureCarousel) {
  new bootstrap.Carousel(featureCarousel, {
    interval: 4000, // 7.5 seconds
    ride: 'carousel'
  });
}
