import {Injectable} from '@angular/core';
import {PandoraService} from './pandora.service';
@Injectable()
export class PandoraPlaybackService { 
  audioElement: HTMLAudioElement;
  currentTime: number = 0;
  totalTime: number = 0;
  volBarActive: boolean = false;
  isPlaying: boolean = false;
  isMuted: boolean = false;

  constructor(private pandoraService: PandoraService){}
  initializePlayer(){
    this.audioElement = <HTMLAudioElement> document.getElementById("audioDisplay");
    this.audioElement.addEventListener("loadedmetadata", this.updateData);
    this.audioElement.addEventListener("timeupdate", this.updateTime);
    this.audioElement.addEventListener("ended", (e) => this.nextSong(e));
    this.audioElement.addEventListener("playing", () => this.playSong);
    this.audioElement.addEventListener("pause", () => this.pauseSong);
  }

  playMusic(){
    if (this.pandoraService.currentSong.audioUrlMap) {
      document.getElementById('audioDisplay').setAttribute('src', this.pandoraService.currentSong.audioUrlMap.mediumQuality.audioUrl);
      document.getElementById('nowPlayingImg').setAttribute('src', this.pandoraService.currentSong.albumArtUrl);
      document.getElementById('artistName').innerText = this.pandoraService.currentSong.artistName;
      document.getElementById('songName').innerText = this.pandoraService.currentSong.songName;
    }
  }

  toggleVolumeBar() {
    let volBar = document.getElementById('vol-bar');
    if (this.volBarActive) {
      volBar.classList.add('volume-bar-active');
      this.volBarActive = false;
    } else {
      volBar.classList.remove('volume-bar-active');
      this.volBarActive = true;
    }
  };
  togglePlayPause() {
    if (this.audioElement.paused) {
      this.playSong();
    } else {
      this.pauseSong();
    }
  };

    toggleMute() {
    if (this.isMuted) {
      document.getElementById("volumeControl").innerHTML= "volume_up";
    //  this.audioElement.volume = this.volumeBeforeMute;
      this.isMuted = false;
    }
    else {
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
    this.audioElement.pause();
    this.isPlaying = false;
    document.getElementById("playButton").innerHTML="play_arrow";
  };

  playSong() {
    this.audioElement.play();
    this.isPlaying = true;
    document.getElementById("playButton").innerHTML="pause";
  };

  changeStation(index) {
    this.pandoraService.changeStation(index);
    this.nextSong();
  };

nextSong(e?: any) {
    this.pandoraService.getNextSong().then(()=>{
      // this.pandoraService.goNextSong();
      this.playMusic();
      this.playSongIfNot();
    })
  };

  updateVol() {
    this.audioElement.volume =  parseInt((<HTMLInputElement>document.getElementById("volume-slider")).value);
  };

  updateData = () => {
    this.totalTime = this.audioElement.duration;
  };

  updateTime = () => {
    this.currentTime = this.audioElement.currentTime;
  };

}
