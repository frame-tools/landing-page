(function () {
  new Swiper('.team', {
    speed: 600,
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true,
      parallax: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})();
