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

  const sliderMini = new SliderMini({
    parentSelector: '.showup__content-slider', 
    nextSlideSelector: ['.showup__next'],
    prevSlideSelector: '.showup__prev'
  });

  sliderMini.render();
});