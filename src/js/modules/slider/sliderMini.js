
import Slider from "./slider";
import ShowUpContent from "../showUpContent";

export default class SliderMini extends Slider {
  constructor (all) {
    super(all);
    this.lastSlides = 0;
    this.currentSlide = 0;
    this.arraySlideLessThanStep = this.slideLessThanStep(this.stepSlide, this.slides);
  }

  slideLessThanStep(step, slides) {
    for (let i = slides; i > 0; i -= step) {
      if (i - step < 0) {
        return [step - i, i, step, slides - i];
      }
    }
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
        if (this.arraySlideLessThanStep) {
          if (this.currentSlide === 0) {
            this.currentSlide = this.slides;
            this.stepSlide = this.arraySlideLessThanStep[1];
          } else if (this.currentSlide === this.arraySlideLessThanStep[3]) {
            this.stepSlide = this.arraySlideLessThanStep[2];
          }
          this.currentSlide--;
        } else {
          this.currentSlide--;
        }
        
        this.parentSelector.insertBefore(this.parentSelector.children[this.slides - 1 - this.lastSlides], this.parentSelector.children[0]);
      }

    } else {
      for (let i = 0; i < this.stepSlide; i++) {
        if (this.arraySlideLessThanStep) {
          if (this.currentSlide === this.arraySlideLessThanStep[3]) {
            this.stepSlide = this.arraySlideLessThanStep[1];
          } else if (this.currentSlide === this.slides) {
            this.currentSlide = 0;
            this.stepSlide = this.arraySlideLessThanStep[2];
          } 
          this.currentSlide++;
        } else {
          this.currentSlide++;
        }
        
        this.parentSelector.insertBefore(this.parentSelector.children[0], this.parentSelector.children[this.slides - this.lastSlides]);
        
      }
    }
    
    if (!this.arraySlideLessThanStep) {
      if (this.currentSlide > this.slides - this.stepSlide) {
        this.currentSlide = 0;
      } else if (this.currentSlide < 0) {
        this.currentSlide = this.slides - this.stepSlide;
      }
    }
    
    console.log(this.currentSlide, 'current', this.numberForReturnOnFirstSlide, 'numberForReturnOnFirstSlide');
  }

  setFlippingInterval(selector) {
    this.flippingInterval = setInterval(() => {
      this.prevNextSlide(selector);
      this.hide();
      this.show();
    }, 5000);
  }

  returnSlideOnStandartPosition() {
    for (let i = 0; i < this.currentSlide; i++) {
      this.parentSelector.insertBefore(this.parentSelector.children[this.slides - 1], this.parentSelector.children[0]);
    }
    this.currentSlide = 0;
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
        this.pauseAutoSlideFlippingIfMouseOver(this.mouseMoveSelector);
      }
    } catch {}
  }
}