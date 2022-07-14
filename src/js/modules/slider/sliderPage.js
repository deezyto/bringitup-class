import Slider from "./slider";

export default class SliderPages extends Slider {
  constructor (all) {
    super(all);
  }

  hide() {
    this.parentChildren.forEach(page => {
      page.style.display = 'none';
    });
  }

  show() {
    if (this.slideIndex === this.parentChildren.length) {
      this.slideIndex = 0;
    } else if (this.slideIndex === -1) {
      this.slideIndex = this.parentChildren.length - 1;
    }

    this.parentSelector.children[this.slideIndex].style.display = 'block';
  }

  trigger(selector) {
    this.parentChildren.forEach(page => {
      page.querySelector(selector).addEventListener('click', () => {
        if (selector === this.nextSlideSelector[0] || selector === this.nextSlideSelector[1]) {
          this.slideIndex++;
        } else if (selector === this.prevSlideSelector) {
          this.slideIndex--;
        }
        else {
          this.slideIndex = 0;
        }
        
        Slider.pageNumber = this.slideIndex;
        this.hide();
        this.show();

      });
    });
  }

  init() {
    
    this.hide();
    this.show(0);
    this.trigger(this.nextSlideSelector[0]);
    try {
      this.trigger(this.prevSlideSelector);
      this.trigger(this.nextSlideSelector[1]);
    } catch {}
    
    try {
      this.trigger(this.firstSlideSelector);
    } catch {
      
    }
    
  }
}