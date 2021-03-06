//After pressing the button, the next item is displayed, after 
//displaying the last item, the button disappears
export default class ShowContentByStep {
  constructor ({parentSelector = null, buttonSelector = null, typeAnimation = 'fadeIn', removeAnimation = false} = {}) {
    this.parentSelector = parentSelector;
    this.buttonSelector = buttonSelector;
    this.typeAnimation = typeAnimation;
    this.arrayShowElements = [];
    this.removeAnimation = removeAnimation;
  }

  childrenLength(indexSelector) {
    return document.querySelector(this.parentSelector[indexSelector]).children.length;
  }

  hideContent(indexLastElement = 1) {
    this.parentSelector.forEach((selector, index) => {
      this.arrayShowElements.push(0);
      Array.from(document.querySelector(selector).children).forEach((elem, item) => {
        if (indexLastElement === 1 && item > 0 && item !== this.childrenLength(index) - 1) {
          elem.style.display = 'none';
        } else if (item === indexLastElement) {
          elem.style.display = 'none';
        }
      });
    });
  }

  showContent(indexSelector, indexElement) {
    Array.from(document.querySelector(this.parentSelector[indexSelector]).children).forEach((elem, i) => {
      if (i === indexElement) {
        elem.classList.add('animated');
        elem.classList.add(this.typeAnimation);
        elem.style.display = 'flex';
        
        if (this.removeAnimation) {
          setTimeout(() => {
            elem.classList.remove(this.typeAnimation);
          },1000);
        }
        
      }
    });
  }

  showContentByStep() {
    this.parentSelector.forEach((selector, index) => {
      document.querySelector(selector).querySelector(this.buttonSelector).addEventListener('click', () => {
        this.arrayShowElements[index] += 1;
        this.showContent(index, this.arrayShowElements[index]);
        if (this.arrayShowElements[index] === this.childrenLength(index) - 2) {
          this.arrayShowElements[index] = 0;
          document.querySelector(this.parentSelector[index]).children[this.childrenLength(index) - 1].style.display = 'none';
        }
      });
    });
  }

  render() {
    this.hideContent();
    this.showContentByStep();
  }
}