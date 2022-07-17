export default class Animation {
  constructor ({selectorForAnimation = null, buttonSelector = null, heightShowContent = 50} = {}) {
    this.selectorForAnimation = selectorForAnimation;
    this.buttonSelector = buttonSelector;
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