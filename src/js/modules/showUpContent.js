
export default class ShowUpContent {
  constructor ({parentSelector = null, slideIndex = null, iterator = 0} = {}) {
    this.slideIndex = slideIndex;
    this.parentSelector = document.querySelector(parentSelector);
    this.iterator = iterator;
  }

  hideContent() {
    this.parentSelector.style.opacity = '0';
  }

  showContent() {
    this.parentSelector.style.opacity = '1';
  }

  setAnimation() {
    this.parentSelector.classList.toggle('animated');
    this.parentSelector.classList.toggle('slideInUp');
  }

  showUp() {
      setTimeout(() => {
        this.setAnimation();
        this.showContent();
      }, 5000);
      setTimeout(() => {
        this.setAnimation();
      }, 10000);
  }

  render() {
    if (this.iterator === 0) {
      this.hideContent();
      this.showUp();
    }
  }
}