import Slider from "./slider/slider";

export default class ShowUpContent extends Slider {
  constructor (slideIndex, parentSelector) {
    super(slideIndex, parentSelector);
  }

  hideContent() {
    this.parentSelector.style.opacity = '0';
  }

  showUp() {
    if (Slider.pageNumber === 2) {
      setTimeout(() => {
        this.parentSelector.classList.add('animated');
        this.parentSelector.classList.add('slideInUp');
        this.parentSelector.style.opacity = '1';
      }, 5000);
    }
  
  }

  render() {
    this.hideContent();
    this.showUp();
  }
}