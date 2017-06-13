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
      this.videoElement.play();
  }
}
