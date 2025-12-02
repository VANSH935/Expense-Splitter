const heroCarousel = document.querySelector('#heroCarousel');
if (heroCarousel) {
  new bootstrap.Carousel(heroCarousel, {
    interval: 3000,
    ride: 'carousel'
  });
}

const featureCarousel = document.querySelector('#featureCarousel');
if (featureCarousel) {
  new bootstrap.Carousel(featureCarousel, {
    interval: 3500,
    ride: 'carousel'
  });
}
