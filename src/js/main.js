import SliderPages from "./modules/slider/sliderPage";

window.addEventListener('DOMContentLoaded', () => {
  const sliderPage = new SliderPages({
    parentSelector: ['.page', '.moduleapp'], 
    nextSlideSelector: ['.next', '.nextmodule'],
    prevSlideSelector: '.prevmodule',
    firstSlideSelector: '.sidecontrol a'
  });
  sliderPage.init();
});