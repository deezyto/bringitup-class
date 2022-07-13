
import Slider from "./slider";

export default class SliderMini extends Slider {
  constructor (all) {
    super(all);
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
    let lastSlides = 0;

    if (this.parentSelector.children[this.slides - 1].tagName === 'BUTTON' && this.parentSelector.children[this.slides - 2].tagName === 'BUTTON') {
      lastSlides = 2;
    }

    if (selector === this.prevSlideSelector) {
      for (let i = 0; i < this.stepSlide; i++) {
        this.parentSelector.insertBefore(this.parentSelector.children[this.slides - 1 - lastSlides], this.parentSelector.children[0]);
      } 

    } else {
      for (let i = 0; i < this.stepSlide; i++) {
        this.parentSelector.insertBefore(this.parentSelector.children[0], this.parentSelector.children[this.slides - lastSlides]);
      }
    }

  }

  autoSlide(selector) {
    this.flippingInterval = setInterval(() => {
      this.prevNextSlide(selector);
      this.hide();
      this.show();
    }, 5000);
  }

  mouseMove(selector) {
    ['mousemove', 'mouseleave'].forEach(event => {
      selector.forEach(elem => {
        document.querySelector(elem).addEventListener(event, (e) => {
          if (e.type === 'mousemove') {
            clearInterval(this.flippingInterval);
          } else if (e.type === 'mouseleave') {
            this.autoSlide(selector);
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
      this.autoSlide(this.nextSlideSelector[0]);
      this.mouseMove(this.mouseMoveSelector);
    }
  }

}