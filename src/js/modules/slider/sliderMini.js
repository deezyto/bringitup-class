
import Slider from "./slider";
import ShowUpContent from "../showUpContent";

export default class SliderMini extends Slider {
  constructor (all) {
    super(all);
    this.numberForReturnOnFirstSlide = 0;
    this.lastSlides = 0;
    this.currentSlide = 0;
    this.currentSlidePrev = 0;
    this.notSlide1 = this.notSlide(this.stepSlide, this.slides);

  }

  notSlide(step, slides) {
    for (let i = slides; i > 0; i -= step) {
      if (i - step < 0) {
        return [step - i, i, slides - i];
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
      console.log(this.currentSlide, 'current before')
      if (this.currentSlide >= 8) {
        this.currentSlide = 0;
      }

      for (let i = 0; i < this.stepSlide; i++) {
        this.parentSelector.insertBefore(this.parentSelector.children[this.slides - 1 - this.lastSlides], this.parentSelector.children[0]);
        this.numberForReturnOnFirstSlide--;
        
        this.currentSlide++;
        
        if (this.notSlide1) {
          if (this.currentSlide === 1) {
            this.stepSlide -= this.notSlide1[0];
          } else if (this.currentSlide === 3) {
            this.stepSlide += this.notSlide1[0];
            //this.currentSlide = 1;
          }
  
          if (this.currentSlide >= this.slides) {
            this.currentSlide = 0;
          }
        }
        
        console.log(this.currentSlide, 'current')
      }

    } else {
      //let notSlide = this.notSlide(this.stepSlide, this.slides);
      
      for (let i = 0; i < this.stepSlide; i++) {
        this.parentSelector.insertBefore(this.parentSelector.children[0], this.parentSelector.children[this.slides - this.lastSlides]);
        this.numberForReturnOnFirstSlide++;
        this.currentSlide++;
        //коли степ слайд більше ніж самих слайдів
        //this.currentSlide === this.stepSlide * 2
        //if (this.notSlide(this.stepSlide, this.slides)) {
        
        if (this.notSlide1) {
          if (this.currentSlide === this.notSlide1[2]) {
            this.stepSlide -= this.notSlide1[0];
          } else if (this.currentSlide > this.slides) {
            this.stepSlide += this.notSlide1[0];
            this.currentSlide = this.notSlide1[0];
          }
        }
        
        //}

        
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
        this.pauseAutoSlideFlippingIfMouseOver(this.mouseMoveSelector);
      }
    } catch {}
  }
}