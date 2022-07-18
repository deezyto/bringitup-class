
export default class showContentByStep {
  constructor ({parentSelector = null, buttonSelector = null} = {}) {
    this.parentSelector = parentSelector;
    this.buttonSelector = buttonSelector;
    this.i = 0;
  }

  hideContent(number = 1) {
    this.parentSelector.forEach(selector => {
      Array.from(document.querySelector(selector).children).forEach((elem, i) => {
        if (i > 0 && i !== document.querySelector(selector).children.length - 1 && number === 1) {
          elem.style.display = 'none';
        } else if (i === number) {
          elem.style.display = 'none';
        }
      });
    });
  }

  showContent(number, selector) {
    //this.parentSelector.forEach(selector => {
      Array.from(document.querySelector(this.parentSelector[selector]).children).forEach((elem, i) => {
        if (i === number) {
          elem.classList.add('animated');
          elem.classList.add('fadeIn');
          elem.style.display = 'flex';
        }
      });
    //});
  }

  showContentByStep() {
    this.parentSelector.forEach((selector, item) => {
      document.querySelector(selector).querySelector(this.buttonSelector).addEventListener('click', () => {
        console.log('click');
        this.i++;
        this.showContent(this.i, item);
        if (this.i === 3) {
          this.i = 0;
          document.querySelector(this.parentSelector[item]).children[4].style.display = 'none';
          //this.hideContent(4);
        }
      });
    });
  }

  render() {
    this.hideContent();
    this.showContentByStep();
    //console.log(this.parentSelector, 'parent', this.buttonSelector);
  }
}