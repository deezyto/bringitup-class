export default class Slider {
  constructor ({
    parentSelector = null, 
    prevSlideSelector = null, 
    nextSlideSelector = null, 
    firstSlideSelector = null,
    activeSlideClass = null,
    stepSlide = 1,
    autoSlideFlipping = false,
    mouseMoveSelector = null
    } = {}) {
    this.parentSelector = document.querySelector(parentSelector);
    this.parentChildren = Array.from(this.parentSelector.children);
    this.prevSlideSelector = prevSlideSelector;
    this.nextSlideSelector = nextSlideSelector;
    this.firstSlideSelector = firstSlideSelector;
    this.slideIndex = 0;
    this.slides = this.parentSelector.children.length;
    this.activeSlideClass = activeSlideClass;
    this.stepSlide = stepSlide;
    this.autoSlideFlipping = autoSlideFlipping;
    this.flippingInterval = null;
    this.mouseMoveSelector = mouseMoveSelector;
  }

}