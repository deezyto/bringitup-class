import SliderMini from "./modules/slider/sliderMini";
import SliderPages from "./modules/slider/sliderPage";

window.addEventListener('DOMContentLoaded', () => {
  const sliderPage = new SliderPages({
    parentSelector: ['.page', '.moduleapp'], 
    nextSlideSelector: ['.next', '.nextmodule'],
    prevSlideSelector: '.prevmodule',
    firstSlideSelector: '.sidecontrol a'
  });

  sliderPage.init();

  const sliderShowup = new SliderMini({
    parentSelector: '.showup__content-slider', 
    nextSlideSelector: ['.showup__next'],
    prevSlideSelector: '.showup__prev',
    stepSlide: 2,
    activeSlideClass: 'card-active'
  });

  sliderShowup.render();

  const sliderModules = new SliderMini({
    parentSelector: '.modules__content-slider', 
    nextSlideSelector: ['.slick-next'],
    prevSlideSelector: '.slick-prev',
    stepSlide: 2,
    activeSlideClass: 'card-active',
    autoSlideFlipping: true
  });

  sliderModules.render();

  const feedSlider = new SliderMini({
    parentSelector: '.feed__slider', 
    nextSlideSelector: ['.feed__slider .slick-next'],
    prevSlideSelector: '.feed__slider .slick-prev',
    stepSlide: 1,
    activeSlideClass: 'feed__item-active'
  });

  feedSlider.render();
});