
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
      },
    });
  }

  blockVideos(selector, index) {
    if (index % 2 !== 0) {
      selector.setAttribute('data-block', 'true');
    }
  }

  setVideoViewHistoryToLocalStorage(index) {
    const unlockVideo = document.querySelectorAll(this.playButtonSelector)[index].parentNode.getAttribute('data-url');
    const getVideoId = window.localStorage.getItem(`${index}_${unlockVideo}`);
    if (!getVideoId) {
      window.localStorage.setItem(`${index}_${unlockVideo}`, unlockVideo);
    }
  }

  unlockVideo() {
    document.querySelectorAll(this.playButtonSelector).forEach((elem, index) => {
      let id = elem.parentNode.getAttribute('data-url');
      let videoId = window.localStorage.getItem(`${index}_${id}`);
      if (videoId !== null) {
        this.setStyleToUnlockVideo(index - 1);
      }
    });
  }

  setStyleToUnlockVideo(index) {
    const svgCopy = document.querySelector(`${this.playButtonSelector} svg`).cloneNode(true);
    const unlockVideo = document.querySelectorAll(this.playButtonSelector);

    document.querySelectorAll(`${this.playButtonSelector} svg`)[index + 1].remove();
    unlockVideo[index + 1].appendChild(svgCopy);
    unlockVideo[index + 1].parentElement.lastElementChild.remove();
    unlockVideo[index + 1].parentElement.appendChild(unlockVideo[0].parentElement.lastElementChild.cloneNode(true));
    unlockVideo[index + 1].parentElement.parentElement.style.cssText = `
    opacity: 1;
    filter: none;
    `;
    document.querySelectorAll(this.playButtonSelector)[index + 1].setAttribute('data-block', 'false');
  }

  onPlayerStateChange(event) {
    if (event.data === 0) {
      this.setStyleToUnlockVideo(this.currentVideoIndex);
      this.setVideoViewHistoryToLocalStorage(this.currentVideoIndex + 1);
    }
  }

  render() {
    this.createIframe();
    this.showModal();
    this.unlockVideo();
    this.hideModal();
  }
}