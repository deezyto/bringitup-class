
export default class showContentByStep {
  constructor ({parentSelector = null, buttonSelector = null, typeAnimation = 'fadeIn'} = {}) {
    this.parentSelector = parentSelector;
    this.buttonSelector = buttonSelector;
    this.typeAnimation = typeAnimation;
    this.array = [];
    this.firstSpace = 1;
    this.lastSpace = 1;
  }

  childrenLength(indexSelector) {
    return document.querySelector(this.parentSelector[indexSelector]).children.length;
  }

  hideContent(indexSelector = 1) {
    this.parentSelector.forEach((selector, index) => {
      this.array.push(0);
      Array.from(document.querySelector(selector).children).forEach((elem, i) => {
        if (i > 0 && i !== this.childrenLength(index) - 1 && indexSelector === 1) {
          elem.style.display = 'none';
        } else if (i === indexSelector) {
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
      }
    });
  }

  showContentByStep() {
    this.parentSelector.forEach((selector, index) => {
      document.querySelector(selector).querySelector(this.buttonSelector).addEventListener('click', () => {
        this.array[index] += 1;
        this.showContent(index, this.array[index]);
        if (this.array[index] === this.childrenLength(index) - 2) {
          this.array[index] = 0;
          document.querySelector(this.parentSelector[index]).children[4].style.display = 'none';
        }
      });
    });
  }

  render() {
    this.hideContent();
    this.showContentByStep();
  }
}