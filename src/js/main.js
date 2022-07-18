import SliderMini from "./modules/slider/sliderMini";
import SliderPages from "./modules/slider/sliderPage";
import HideShowContent from "./modules/hideShowContent";
import ShowContentByStep from "./modules/showContentByStep";
import GetHideLink from "./modules/getHideLink";

window.addEventListener('DOMContentLoaded', () => {

  try {
    const sliderPage = new SliderPages({
      parentSelector: ['.page', '.moduleapp'], 
      nextSlideSelector: ['.next', '.nextmodule'],
      prevSlideSelector: '.prevmodule',
      firstSlideSelector: '.sidecontrol a'
    });
  
    sliderPage.init();
  } catch {}

  try {
    const sliderShowup = new SliderMini({
      parentSelector: '.showup__content-slider', 
      nextSlideSelector: ['.showup__next'],
      prevSlideSelector: '.showup__prev',
      stepSlide: 2,
      activeSlideClass: 'card-active'
    });
  
    sliderShowup.render();
  } catch {}

  try {
    const sliderModules = new SliderMini({
      parentSelector: '.modules__content-slider', 
      nextSlideSelector: ['.slick-next', '.next'],
      prevSlideSelector: '.slick-prev',
      stepSlide: 2,
      activeSlideClass: 'card-active',
      autoSlideFlipping: true,
      mouseMoveSelector: ['.modules__content-slider', '.slick-next', '.slick-prev'],
      autoSlideFlippingOption: {turn: true, sliderPage: 2}
    });
  
    sliderModules.render();
  } catch {}

  try {
    const feedSlider = new SliderMini({
      parentSelector: '.feed__slider', 
      nextSlideSelector: ['.feed__slider .slick-next'],
      prevSlideSelector: '.feed__slider .slick-prev',
      stepSlide: 1,
      activeSlideClass: 'feed__item-active'
    });
  
    feedSlider.render();
  } catch {}

  try {
    new HideShowContent({
      buttonSelector: '.plus',
      contentSelector: '.msg'
    }).render();
  } catch {}

  try {
    new ShowContentByStep({
      parentSelector: ['.officernew', '.officerold'],
      buttonSelector: '.plus',
      typeAnimation: 'fadeIn'
    }).render();
  } catch {}
  
  try {
    new GetHideLink({
      parentSelector: '.module__info-book',
      buttonSelector: '.download'
    }).render();
  } catch {}
  
});