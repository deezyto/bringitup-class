
export default class Animation {
  constructor ({selectorForAnimation = null, heightShowContent = 50, speed = 1} = {}) {
    this.selectorForAnimation = selectorForAnimation;
    this.showHide = 'show';
    this.heightShowContent = heightShowContent;
    this.speed = speed;
    this.animation = 0;
  }

  animationShowHide() {
    if (this.animation <= this.heightShowContent && this.showHide === 'show') {
      this.selectorForAnimation.style.height = this.animation + 'px';
      this.animation += this.speed;
      this.animate = requestAnimationFrame(this.animationShowHide.bind(this));
      if (this.animation === this.heightShowContent) {
        cancelAnimationFrame(this.animate);
      }
    }
    
    if (!this.animation && this.showHide === 'hide') {
      this.animation = this.heightShowContent;
    }

    if (this.animation > 0 && this.showHide === 'hide') {
      this.selectorForAnimation.style.height = this.animation + 'px';
      this.animation -= this.speed;
      this.animate = requestAnimationFrame(this.animationShowHide.bind(this));
      if (this.animation === 0) {
        this.selectorForAnimation.style.height = '1px';
        cancelAnimationFrame(this.animate);
      }
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