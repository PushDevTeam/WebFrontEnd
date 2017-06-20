import {Injectable} from '@angular/core';
import {PandoraService} from './pandora.service';
@Injectable()
export class VideoPlaybackService { 
  public videoElement: HTMLVideoElement;

  constructor(private pandoraService: PandoraService){}
  initializePlayer() {
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
