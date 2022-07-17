import Animation from "./animation";

export default class HideShowContent {
  constructor({parentSelector = null, buttonSelector = null, contentSelector = null} = {}) {
    this.parentSelector = document.querySelector(parentSelector);
    this.buttonSelector = document.querySelectorAll(buttonSelector);
    this.contentSelector = document.querySelectorAll(contentSelector);
  }

  hideShow() {
    console.log(this.parentSelector, 'parent')
    //selectorContent.classList.toggle('active');
  }

  bindTrigger() {
    this.buttonSelector.forEach((button, i) => {
      button.addEventListener('click', () => {
        console.log('click');
        if (!this.contentSelector[i].closest('.show')) {
          new Animation({
            selectorForAnimation: this.contentSelector[0],
            buttonSelector: button,
            showHide: 'show',
            heightShowContent: '80'
          }).animationShowHide();
          //this.contentSelector[i].classList.toggle('show');
        } else {
          //this.contentSelector[i].classList.toggle('show');
          new Animation({
            selectorForAnimation: this.contentSelector[0],
            buttonSelector: button,
            showHide: 'hide',
            heightShowContent: '80'
          }).animationShowHide();
          
        }
        
       
        /* this.contentSelector[i].classList.toggle('animated');
        this.contentSelector[i].classList.toggle('fadeInRight'); */
        
      });
    });
  }

  render() {
    this.hideShow();
    this.bindTrigger();
  }
}