import Animation from "./animation";

export default class HideShowContent {
  constructor({buttonSelector = null, contentSelector = null} = {}) {
    this.buttonSelector = document.querySelectorAll(buttonSelector);
    this.contentSelector = document.querySelectorAll(contentSelector);
  }

  trigger() {
    this.buttonSelector.forEach((button, i) => {
      button.addEventListener('click', () => {
        try {
          new Animation({
            selectorForAnimation: this.contentSelector[i],
            heightShowContent: '80',
            speed: 2
          }).render();
        } catch {}
      });
    });
  }

  render() {
    this.trigger();
  }
}