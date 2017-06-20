import {Injectable} from '@angular/core';
import {PandoraService} from './pandora.service';
@Injectable()
export class VideoPlaybackService { 
  videoElement: HTMLVideoElement;
  currentVideoId: string;

  constructor(private pandoraService: PandoraService){}
  initializePlayer() {
    if (this.videoElement) {
      this.videoElement.remove();
    }
    this.videoElement = <HTMLVideoElement>document.getElementById('video-player');
  }

  playVideo() {
    let src = this.videoElement.currentSrc;
    console.log("video source", src);
    if (src && this.videoElement.paused) {
      this.videoElement.play();
    }
  }

  pauseVideo() {
    if (!this.videoElement.paused) {
      this.videoElement.pause();
    }
  }
}
