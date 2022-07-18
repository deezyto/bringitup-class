
export default class ShowVideoPlayer {
  constructor({parentSelector = null, modalSelector = null, videoAttribute = null, playButtonSelector = null, closeModalSelector = null} = {}) {
    this.parentSelector = parentSelector;
    this.modalSelector = document.querySelector(modalSelector);
    this.videoAttribute = videoAttribute;
    this.playButtonSelector = playButtonSelector;
    this.closeModalSelector = closeModalSelector;
    this.player = 0;
    this.currentVideo = 0;
  }

  showModal() {
    document.querySelectorAll(this.playButtonSelector).forEach(selector => {
      selector.addEventListener('click', () => {
        this.modalSelector.style.display = 'flex';
        let videoUrl = selector.parentNode.getAttribute('data-url');
        if (!this.player) {
          this.onYouTubeIframeAPIReady(videoUrl);
          this.currentVideo = videoUrl;
        } else {
          if (this.currentVideo === videoUrl) {
            this.player.playVideo();
          } else {
            console.log(videoUrl);
            this.currentVideo = videoUrl;
            this.player.loadVideoById({videoId: videoUrl});
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

  onYouTubeIframeAPIReady(url) {
    this.player = new YT.Player('frame', {
      width: '100%',
      height: '100%',
      videoId: url,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
  }

  onPlayerStateChange(event) {
    console.log(event);
    
  }

  render() {
    this.createIframe();
    this.showModal();
    this.hideModal();
  }
}