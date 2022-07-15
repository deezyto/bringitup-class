
import Slider from "./slider";
import ShowUpContent from "../showUpContent";

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

    if (this.numberForReturnOnFirstSlide > this.slides - this.stepSlide) {
      this.numberForReturnOnFirstSlide = 0;
    } else if (this.numberForReturnOnFirstSlide < 0) {
      this.numberForReturnOnFirstSlide = this.slides - this.stepSlide;
    }
  }

  setFlippingInterval(selector) {
    this.flippingInterval = setInterval(() => {
      this.prevNextSlide(selector);
      this.hide();
      this.show();
    }, 5000);
  }

  returnSlideOnStandartPosition() {
    for (let i = 0; i < this.numberForReturnOnFirstSlide; i++) {
      this.parentSelector.insertBefore(this.parentSelector.children[this.slides - 1], this.parentSelector.children[0]);
    }
    this.numberForReturnOnFirstSlide = 0;
    this.hide();
    this.show();
  }

  bindToCurrentPage(selector) {
    document.querySelectorAll(this.nextSlideSelector[1]).forEach(elem => {
      elem.addEventListener('click', () => {
        new ShowUpContent({
          parentSelector: '.hanson',
          currentPageNumber: Slider.pageNumber,
          showOnPage: this.autoSlideFlippingOption.sliderPage
        }).render();
        if (this.autoSlideFlippingOption.turn) {
          if (Slider.pageNumber === this.autoSlideFlippingOption.sliderPage) {
            this.setFlippingInterval(selector);
          } else {
            clearInterval(this.flippingInterval);
            this.returnSlideOnStandartPosition();
          }
        }
      });
    });
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
    try {
      this.bindToCurrentPage(this.nextSlideSelector[0]);
      if (this.autoSlideFlipping) {
        this.setFlippingInterval(this.nextSlideSelector[0]);
        this.pauseAutoSlideFlippingIfMouseOver();
      }
    } catch {}
  }
}