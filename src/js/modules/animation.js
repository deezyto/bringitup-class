export default class Animation {
  constructor ({selectorForAnimation = null, buttonSelector = null, showHide = 'hide', heightShowContent = 50} = {}) {
    this.selectorForAnimation = selectorForAnimation;
    this.buttonSelector = buttonSelector;
    this.showHide = showHide;
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

  }

  render(animation) {

  }

}