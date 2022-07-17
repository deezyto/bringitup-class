
export default class Animation {
  constructor ({selectorForAnimation = null, heightShowContent = 50} = {}) {
    this.selectorForAnimation = selectorForAnimation;
    this.showHide = 'hide';
    this.heightShowContent = heightShowContent;
    this.animation = 0;
  }

  animationShowHide() {
    if (this.animation <= this.heightShowContent && this.showHide === 'show') {
      requestAnimationFrame(this.animationShowHide.bind(this));
      this.selectorForAnimation.style.height = this.animation + 'px';
      this.animation++;
    }

    if (!this.animation && this.showHide === 'hide') {
      this.animation = this.heightShowContent;
    }

    if (this.animation > 1 && this.showHide === 'hide') {
      requestAnimationFrame(this.animationShowHide.bind(this));
      this.selectorForAnimation.style.height = this.animation + 'px';
      this.animation--;
    }
  }

  style() {
    if (!this.selectorForAnimation.closest('.show')) {
      this.showHide = 'show';
      this.selectorForAnimation.classList.toggle('show');
      this.selectorForAnimation.style.cssText = `
      visibility: visible;
      opacity: 1;
      transition: .5s all;
      overflow: hidden;
      height: 0;
      display: block;
      `;
    } else {
      this.showHide = 'hide';
      this.selectorForAnimation.classList.toggle('show');
    }
  }

  render() {
    this.style();
    this.animationShowHide();
  }

}