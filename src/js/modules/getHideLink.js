
export default class GetHideLink {
  constructor ({parentSelector = null, buttonSelector = null} = {}) {
    this.parentSelector = document.querySelectorAll(parentSelector);
    this.buttonSelector = document.querySelectorAll(buttonSelector);
    this.links = {
      "bitmap": "assets/img/Bitmap.jpg",
      "feed-1": "assets/img/feed_1.png",
      "feed-2": "assets/img/feed_2.png",
      "hanson": "assets/img/hanson.png",
      "talk-bg": "assets/img/talk_bg.jpg",
      "main-bg": "assets/img/mainbg.jpg",
      "computer": "assets/img/showup.jpg",
      "item": "assets/img/Bitmap.jpg"
    };
  }

  setDataAttribute() {
    let i = 0;
    for (let link in this.links) {
      this.parentSelector[i].setAttribute('data-link', link);
      i++;
    }
  }

  createLink(nameLink) {
    const elem = document.createElement('a');
    elem.setAttribute('href', this.links[nameLink]);
    elem.setAttribute('download', nameLink);
    document.body.appendChild(elem);
    elem.click();
    elem.remove();
  }

  getLink() {
    this.buttonSelector.forEach((button, i) => {
      button.addEventListener('click', () => {
        let nameLink = this.parentSelector[i].getAttribute('data-link');
        this.createLink(nameLink);
      });
    });
  }

  render() {
    this.setDataAttribute();
    this.getLink();
  }
}