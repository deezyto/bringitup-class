
export default class ShowUpContent {
  constructor ({parentSelector = null, currentPageNumber = null, typeAnimation = 'slideInUp', showOnPage = 0} = {}) {
    this.currentPageNumber = currentPageNumber;
    this.parentSelector = document.querySelector(parentSelector);
    this.typeAnimation = typeAnimation;
    this.showOnPage = showOnPage;
  }

  hideContent() {
    this.parentSelector.style.opacity = '0';
  }

  showContent() {
    this.parentSelector.style.opacity = '1';
  }

  setAnimation() {
    this.parentSelector.classList.toggle('animated');
    this.parentSelector.classList.toggle(this.typeAnimation);
  }

  removeAnimation() {
    this.parentSelector.classList.toggle('slideInUp');
  }

  showUp() {
    setTimeout(() => {
      this.setAnimation();
      this.showContent();
    }, 4000);
    setTimeout(() => {
      this.removeAnimation();
    }, 8000);
  }

  render() {
    if (!this.parentSelector.classList.contains('animated')) {
      if (this.showOnPage) {
        if (this.currentPageNumber === this.showOnPage) {
          this.hideContent();
          this.showUp();
        }
      } else {
        this.hideContent();
        this.showUp();
      }
    }
  }
}