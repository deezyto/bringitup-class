
export default class ShowVideoPlayer {
  constructor({parentSelector = null, modalSelector = null, videoAttribute = null, playButtonSelector = null, closeModalSelector = null} = {}) {
    this.parentSelector = parentSelector;
    this.modalSelector = document.querySelector(modalSelector);
    this.videoAttribute = videoAttribute;
    this.playButtonSelector = playButtonSelector;
    this.closeModalSelector = closeModalSelector;
    this.player = 0;
    this.currentVideoId = 0;
    this.currentVideoIndex = 0;
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  showModal() {
    document.querySelectorAll(this.playButtonSelector).forEach((selector, index) => {
      this.blockVideos(selector, index);
      selector.addEventListener('click', () => {
        let videoBlock = selector.getAttribute('data-block');
        if (!videoBlock || videoBlock !== 'true') {
          this.modalSelector.style.display = 'flex';
          let videoUrl = selector.parentNode.getAttribute('data-url');
          if (!this.player) {
            this.onYouTubeIframeAPIReady(videoUrl);
            this.currentVideoId = videoUrl;
            this.currentVideoIndex = index;
          } else {
            if (this.currentVideoId === videoUrl) {
              this.player.playVideo();
            } else {
              this.currentVideoId = videoUrl;
              this.currentVideoIndex = index;
              this.player.loadVideoById({videoId: videoUrl});
            }
          }
        }

      });
    });
  }

  hideModal() {
    document.querySelectorAll(this.closeModalSelector).forEach(selector => {
      selector.addEventListener('click', () => {
        this.modalSelector.style.display = 'none';
        this.player.pauseVideo();
      });
    });
  }

  createIframe() {
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.querySelectorAll('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onYouTubeIframeAPIReady(url = 0) {
    this.player = new YT.Player('frame', {
      width: '100%',
      height: '100%',
      videoId: url,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
  }

  blockVideos(selector, index) {
    if (index % 2 !== 0) {
      selector.setAttribute('data-block', 'true');
    }
  }

  onPlayerStateChange(event) {
    if (event.data === 0) {
      const svgCopy = document.querySelector(`${this.playButtonSelector} svg`).cloneNode(true);
      const unlockVideo = document.querySelectorAll(this.playButtonSelector);

      document.querySelectorAll(`${this.playButtonSelector} svg`)[this.currentVideoIndex + 1].remove();
      unlockVideo[this.currentVideoIndex + 1].appendChild(svgCopy);
      unlockVideo[this.currentVideoIndex + 1].parentElement.lastElementChild.remove();
      unlockVideo[this.currentVideoIndex + 1].parentElement.appendChild(unlockVideo[0].parentElement.lastElementChild.cloneNode(true));
      unlockVideo[this.currentVideoIndex + 1].parentElement.parentElement.style.cssText = `
      opacity: 1;
      filter: none;
      `;
      document.querySelectorAll(this.playButtonSelector)[this.currentVideoIndex + 1].setAttribute('data-block', 'false');
    }
  }

  render() {
    this.createIframe();
    this.showModal();
    this.hideModal();
  }
}