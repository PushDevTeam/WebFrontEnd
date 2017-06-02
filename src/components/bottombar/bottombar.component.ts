/**
 * Created by Javes on 5/7/2017.
 */
import {Component} from '@angular/core';
import {TimeDisplayPipe} from "../../pipes/timedisplay.pipe";
import {PandoraService} from '../../services/pandora.service';

@Component({
  selector: 'bottombar',
  templateUrl: 'bottombar.component.html'
})

export class BottomBar {
  private stationPopupActive: boolean = false;
  private volBarActive: boolean = false;
  private audioElement: any;
  private isPlaying: boolean = false;
  private currentTime: number = 0;
  private totalTime: number = 0;
  private hideSearchIcon: boolean = false;
  private stationShowLimit: number = 3;
  constructor(private pandoraService: PandoraService) {

  }


 ngOnInit() {
   this.pandoraService.getStationList().then(()=>{
    this.audioElement = <HTMLAudioElement> document.getElementById("audioDisplay");
    this.audioElement.addEventListener("loadedmetadata", this.updateData);
    this.audioElement.addEventListener("timeupdate", this.updateTime);
    this.audioElement.addEventListener("ended", (e) => this.nextSong(e));
    this.audioElement.addEventListener("playing", () => this.playSong);
    this.audioElement.addEventListener("pause", () => this.pauseSong);
    //this.nextSong();
   })
  }

  updateData = () => {
    this.totalTime = this.audioElement.duration;
  };

  updateTime = () => {
    this.currentTime = this.audioElement.currentTime;
    if (!(this.pandoraService.currentSong === undefined)) {
      if (this.audioElement.getAttribute('src') != this.pandoraService.currentSong.audioUrlMap.mediumQuality.audioUrl) {
        this.nextSong();
      }
    }
  };

  updateVol() {
    this.audioElement.volume =  (<HTMLInputElement>document.getElementById("volume-slider")).value;
  }

  onStationPopup() {
    let stationMenu = document.getElementById('station-menu');
    let stationButton = document.getElementById('station-button');
    let stationDropUpArrow = document.getElementById('station-dropup-arrow');
    if (this.stationPopupActive) {
      stationButton.classList.remove('active');
      stationMenu.classList.remove('station-popup-active');
      stationDropUpArrow.classList.remove('station-arrow-down');
      this.stationPopupActive = false;
    } else {
      stationButton.classList.add('active');
      stationMenu.classList.add('station-popup-active');
      stationDropUpArrow.classList.add('station-arrow-down');
      this.stationPopupActive = true;
    }
  }

  createStation() {

  }

  seeAllStations() {
    if (this.stationShowLimit === 3){
      this.stationShowLimit = 100;
    }
    else if (this.stationShowLimit === 100){
      this.stationShowLimit = 3;
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
  }
  changeStation(index){
    this.pandoraService.changeStation(index);
    this.nextSong();
  }
  nextSong(e?: any){
    this.pandoraService.getNextSong().then(()=>{
      this.pandoraService.goNextSong();
      document.getElementById('audioDisplay').setAttribute('src', this.pandoraService.currentSong.audioUrlMap.mediumQuality.audioUrl);
      document.getElementById('nowPlayingImg').setAttribute('src', this.pandoraService.currentSong.albumArtUrl);
      document.getElementById('artistName').innerText = this.pandoraService.currentSong.artistName;
      document.getElementById('songName').innerText = this.pandoraService.currentSong.songName;
      this.playSong();
    })
  }
  togglePlayPause() {
    if (this.audioElement.paused) {
      this.playSong();
    } else {
      this.pauseSong();
    }
  }
  pauseSong(){
      this.audioElement.pause();
      this.isPlaying = false;
      document.getElementById("playButton").innerHTML="play_arrow";
  }
  playSong(){
      this.audioElement.play();
      this.isPlaying = true;
      document.getElementById("playButton").innerHTML="pause";

  }

  removeSearchIcon() {
    this.hideSearchIcon = true;
  }

  addSearchIcon() {
    this.hideSearchIcon = false;
  }

}
