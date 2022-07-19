
export default class ShowVideoPlayer {
  constructor({playButtonSelector = null, videoAttribute = null, modalSelector = null, closeModalSelector = null} = {}) {
    this.modalSelector = document.querySelector(modalSelector);
    this.videoAttribute = videoAttribute;
    this.playButtonSelector = playButtonSelector;
    this.closeModalSelector = closeModalSelector;
    this.currentVideoId = 0;
    this.currentVideoIndex = 0;
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  createIframe() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.querySelectorAll('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onYouTubeIframeAPIReady(url) {
    this.player = new YT.Player('frame', {
      width: '100%',
      height: '100%',
      videoId: url,
      events: {
        'onStateChange': this.onPlayerStateChange
      },
    });
  }

  blockVideo(selector, index) {
    if (index % 2 !== 0) {
      selector.setAttribute('data-block', 'true');
    }
  }

  showModal() {
    document.querySelectorAll(this.playButtonSelector).forEach((selector, index) => {
      this.blockVideo(selector, index);
      selector.addEventListener('click', () => {
        const videoBlock = selector.getAttribute('data-block');
        if (!videoBlock || videoBlock !== 'true') {
          this.modalSelector.style.display = 'flex';
          const videoUrl = selector.parentNode.getAttribute(this.videoAttribute);
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

  setVideoViewHistoryToLocalStorage(index) {
    try {
      const unlockVideo = document.querySelectorAll(this.playButtonSelector)[index].parentNode.getAttribute(this.videoAttribute);
      const getVideoId = window.localStorage.getItem(`${index}_${unlockVideo}`);
      if (!getVideoId) {
        window.localStorage.setItem(`${index}_${unlockVideo}`, unlockVideo);
      }
    } catch {}
  }

  setStyleToUnlockVideo(index) {
    try {
      const unlockVideo = document.querySelectorAll(this.playButtonSelector);

      if (unlockVideo[index + 1].getAttribute('data-block')) {
        const svgCopy = document.querySelector(`${this.playButtonSelector} svg`).cloneNode(true);
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
      
    } catch {}
  }

  unlockVideo() {
    document.querySelectorAll(this.playButtonSelector).forEach((elem, index) => {
      const id = elem.parentNode.getAttribute(this.videoAttribute);
      const videoId = window.localStorage.getItem(`${index}_${id}`);
      if (videoId) {
        this.setStyleToUnlockVideo(index - 1);
      }
    });
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