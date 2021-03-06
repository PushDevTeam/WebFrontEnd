import {Injectable} from '@angular/core';
import {PandoraService} from './pandora.service';
import {VideoPlaybackService} from './video-playback.service';
@Injectable()
export class PandoraPlaybackService {
  audioElement: HTMLAudioElement;
  currentTime: number = 0;
  totalTime: number = 0;
  volBarActive: boolean = false;
  isPlaying: boolean = false;
  isMuted: boolean = false;
  timeoutHandle: any;
  firstEnter: boolean = true;


  constructor(private pandoraService: PandoraService,
              private videoPlaybackService: VideoPlaybackService){}

    initializePandora() {
      this.pandoraService.getStationList().then(()=>{
        this.initializePlayer();
        this.nextSong();
      });
    }
  initializePlayer(){
    this.audioElement = <HTMLAudioElement> document.getElementById("audioDisplay");
    this.audioElement.addEventListener("loadedmetadata", this.updateData);
    this.audioElement.addEventListener("timeupdate", this.updateTime);
    this.audioElement.addEventListener("ended", (e) => this.nextSong(e));
    this.audioElement.addEventListener("playing", () => this.playSong);
    this.audioElement.addEventListener("pause", () => this.pauseSong);
  }

  playMusic(){
    if (!this.pandoraService.currentSong) {
      this.nextSong().then(()=>{
        this.loadSongMetadata();
      })
    } else {
      this.loadSongMetadata();
    }
  }

  loadSongMetadata() {
    if (this.pandoraService.currentSong.audioUrlMap) {
      document.getElementById('audioDisplay').setAttribute('src', this.pandoraService.currentSong.audioUrlMap.mediumQuality.audioUrl);
      document.getElementById('nowPlayingImg').setAttribute('src', this.pandoraService.currentSong.albumArtUrl);
      document.getElementById('artistName').innerText = this.pandoraService.currentSong.artistName;
      document.getElementById('songName').innerText = this.pandoraService.currentSong.songName;
    }
  }

  toggleVolumeBar() {
    let volBar = document.getElementById('vol-bar');
    if (!this.volBarActive) {
      this.volBarActive = true;
      volBar.classList.add('volume-bar-active');
      this.timeoutHandle = setTimeout(() => {
        let volBar = document.getElementById('vol-bar');
        volBar.classList.remove('volume-bar-active');
        this.volBarActive = false;
      }, 3000);
    }
}

    updateVolBarToggler() {
      if (this.volBarActive) {
        clearTimeout(this.timeoutHandle);
        this.timeoutHandle = setTimeout (() => {
          let volBar = document.getElementById('vol-bar');
          volBar.classList.remove('volume-bar-active');
          this.volBarActive = false;
        }, 2800);
      }
    }

  togglePlayPause() {
    if (this.audioElement.paused) {
      this.playSong();
      this.videoPlaybackService.playVideo();
    } else {
      this.pauseSong();
      this.videoPlaybackService.pauseVideo();
    }
  };

  toggleMute() {
    if (this.isMuted) {
      document.getElementById("volumeControl").innerHTML= "volume_up";
    //  this.audioElement.volume = this.volumeBeforeMute;
      this.isMuted = false;
    } else {
      document.getElementById("volumeControl").innerHTML="volume_off";
      this.isMuted = true;
    }
  }


  playSongIfNot() {
    if (this.audioElement.paused) {
      this.playSong();
    }
  }

  pauseSong() {
    if (!this.audioElement.paused) {
      this.audioElement.pause();
      this.isPlaying = false;
      document.getElementById("playButton").innerHTML="play_arrow";
    }
  };

  playSong() {
    const src = this.audioElement.currentSrc;
    if (this.audioElement.paused) {
      if (src) {
        this.audioElement.play();
        this.isPlaying = true;
        document.getElementById("playButton").innerHTML="pause";
      } else {
        this.nextSong();
      }
    }
  };

  changeStation(index) {
    this.pandoraService.changeStation(index);
    this.nextSong();
  };

nextSong(e?: any) {
    console.log('nextSong e', e);
    return this.pandoraService.getNextSong().then(()=>{
      // this.pandoraService.goNextSong();
      if (e && e.target.nodeName === 'AUDIO' && e.type === 'ended') {
        // this.videoPlaybackService.playVideo();
      }
      this.playMusic();
      this.playSongIfNot()
    })
  };

  updateVol() {
    this.audioElement.volume =   parseFloat((<HTMLInputElement>document.getElementById("volume-slider")).value);
  };

  updateData = () => {
    this.totalTime = this.audioElement.duration;
  };

  updateTime = () => {
    this.currentTime = this.audioElement.currentTime;
  };

}
