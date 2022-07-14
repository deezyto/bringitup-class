
import Slider from "./slider";

export default class SliderMini extends Slider {
  constructor (all) {
    super(all);
    this.numberForReturnOnFirstSlide = 0;
    this.lastSlides = 0;
  }

  hide() {
    this.parentChildren.forEach(page => {
      page.classList.remove(this.activeSlideClass);
    });
  }

  show() {
    this.parentSelector.children[0].classList.add(this.activeSlideClass);
  }

  prevNextSlide(selector) {

    if (this.parentSelector.children[this.slides - 1].tagName === 'BUTTON' && this.parentSelector.children[this.slides - 2].tagName === 'BUTTON') {
      this.lastSlides = 2;
    }

    if (selector === this.prevSlideSelector) {
      for (let i = 0; i < this.stepSlide; i++) {
        this.parentSelector.insertBefore(this.parentSelector.children[this.slides - 1 - this.lastSlides], this.parentSelector.children[0]);
        this.numberForReturnOnFirstSlide--;
      }

    } else {
      for (let i = 0; i < this.stepSlide; i++) {
        this.parentSelector.insertBefore(this.parentSelector.children[0], this.parentSelector.children[this.slides - this.lastSlides]);
        this.numberForReturnOnFirstSlide++;
      }

    }

    if (this.numberForReturnOnFirstSlide > this.slides - 2) {
      this.numberForReturnOnFirstSlide = 0;
    } else if (this.numberForReturnOnFirstSlide < 0) {
      this.numberForReturnOnFirstSlide = this.slides - 2;
    }

  }

  setFlippingInterval(selector) {
    this.flippingInterval = setInterval(() => {
      this.prevNextSlide(selector);
      this.hide();
      this.show();
    }, 5000);
  }

  startAutoSlideFlipping(selector) {
    if (this.startAutoSlideFlippingOnTheSliderPage) {
      document.querySelectorAll(this.nextSlideSelector[1]).forEach(elem => {
        elem.addEventListener('click', () => {
          if (Slider.pageNumber === 2) {
            this.setFlippingInterval(selector);
          } else {
            clearInterval(this.flippingInterval);
            for (let i = 0; i < this.numberForReturnOnFirstSlide; i++) {
              this.parentSelector.insertBefore(this.parentSelector.children[this.slides - 1], this.parentSelector.children[0]);
            }
            this.hide();
            this.show();
            this.numberForReturnOnFirstSlide = 0;
          }
        });
      });
    } else {
      this.setFlippingInterval(selector);
    }
    
  }

  pauseAutoSlideFlippingIfMouseOver(selector) {
    ['mouseover', 'mouseleave'].forEach(event => {
      selector.forEach(elem => {
        document.querySelector(elem).addEventListener(event, (e) => {
          if (e.type === 'mouseover') {
            clearInterval(this.flippingInterval);
          } else if (e.type === 'mouseleave') {
            this.setFlippingInterval(selector);
          }
        });
      });
    });
  }

  trigger(selector) {
    document.querySelector(selector).addEventListener('click', () => {
      this.prevNextSlide(selector);
      this.hide();
      this.show();
    });
  }

  render() {
    
    this.hide();
    this.show();
    this.trigger(this.nextSlideSelector[0]);
    this.trigger(this.prevSlideSelector);
    if (this.autoSlideFlipping) {
      this.startAutoSlideFlipping(this.nextSlideSelector[0]);
      this.pauseAutoSlideFlippingIfMouseOver(this.mouseMoveSelector);
    }
    
  }

}