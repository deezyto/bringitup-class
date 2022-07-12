
import Slider from "./slider";

export default class SliderMini extends Slider {
  constructor (all) {
    super(all);
  }

  next() {
    console.log(this.slideIndex)
    if (this.slideIndex === -1) {
      this.slideIndex = this.parentChildren.length - 1;
    }

    //this.parentSelector.children[this.slideIndex].style.display = 'block';
    this.parentSelector.appendChild(this.parentSelector.children[this.slideIndex]);
  }

  prev() {

  }

  

  trigger(selector) {
      
      document.querySelector(selector).addEventListener('click', () => {
        console.log(this.slides, 'this.slides', this.slides + 1)
        console.log(this.parentSelector.children[0]);
        if (selector === this.nextSlideSelector[0] || selector === this.nextSlideSelector[1]) {
          this.slideIndex++;
          
          
        } else if (selector === this.prevSlideSelector) {
          //this.slideIndex--;
          //console.log(this.parentSelector.children[this.slideIndex + 1], 'this.parentChildren[this.slideIndex')
          this.parentSelector.insertBefore(this.parentSelector.children[this.slides - 1], this.parentSelector.children[this.slideIndex]);
        }
       
        
      });

  }


  render() {
    this.parentSelector.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    overflow: hidden;
    `;
    this.trigger(this.nextSlideSelector);
    this.trigger(this.prevSlideSelector);

  }

}