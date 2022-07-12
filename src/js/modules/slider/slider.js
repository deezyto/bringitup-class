export default class Slider {
  constructor ({parentSelector = null, prevSlideSelector = null, nextSlideSelector = null, firstSlideSelector = null} = {}) {
    this.parentSelector = document.querySelector(parentSelector);
    this.parentChildren = Array.from(this.parentSelector.children);
    this.prevSlideSelector = prevSlideSelector;
    this.nextSlideSelector = nextSlideSelector;
    this.firstSlideSelector = firstSlideSelector;
    this.slideIndex = 0;
  }
}