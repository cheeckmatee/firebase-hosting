var sliderOne = new Swiper(".banner1", {
  slidesPerView: 1,
  spaceBetween: 12,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var sliderTwo = new Swiper(".categories", {
  slidesPerView: 4,
  spaceBetween: 10,
  loop: true,
});

var sliderThree = new Swiper(".products", {
  slidesPerView: 2.3,
  spaceBetween: 20,
  loop: true,
});

var sliderFour = new Swiper(".brands-logo", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
});

var sliderFive = new Swiper(".coupon", {
  slidesPerView: 1.5,
  spaceBetween: 15,
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1.3,
    },
    375: {
      slidesPerView: 1.5,
    },
    767: {
      slidesPerView: 2,
    },
  },
});

var swiper = new Swiper(".offer-slide", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  spaceBetween: 0,
  slidesPerView: "1.8",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

var sliderSix = new Swiper(".main-seller-product", {
  slidesPerView: 1.2,
  spaceBetween: 12,
  loop: true,
});

var sliderSeven = new Swiper(".grocery-categories", {
  slidesPerView: 2.5,
  spaceBetween: 12,
  loop: true,
});

var sliderEight = new Swiper(".grocery-product", {
  slidesPerView: 2.3,
  spaceBetween: 12,
  loop: true,
});

var sliderSeven = new Swiper(".pharmacy-categories", {
  slidesPerView: 3.5,
  spaceBetween: 15,
  loop: true,
});

var sliderEight = new Swiper(".discount-banner", {
  slidesPerView: 2.3,
  spaceBetween: 15,
  loop: true,
});