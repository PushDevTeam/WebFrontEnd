/**
 * Created by Javes on 5/7/2017.
 */
import {Component} from '@angular/core';
import {TimeDisplayPipe} from "../../pipes/timedisplay.pipe";


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

  constructor() {

  }


 ngOnInit() {
   this.audioElement = <HTMLAudioElement> document.getElementById("audioDisplay");
   this.audioElement.addEventListener("loadedmetadata", this.updateData);
   this.audioElement.addEventListener("timeupdate", this.updateTime);
  }

  updateData = () => {
    this.totalTime = this.audioElement.duration;
  };

  updateTime = () => {
    this.currentTime = this.audioElement.currentTime;
  };

  updateVol() {
    this.audioElement.volume =  (<HTMLInputElement>document.getElementById("volume-slider")).value;
  }

  onStationPopup() {
    let stationMenu = document.getElementById('station-menu');
    let stationButton = document.getElementById('station-button');
    if (this.stationPopupActive) {
      stationButton.classList.remove('active');
      stationMenu.classList.remove('station-popup-active');
      this.stationPopupActive = false;
    } else {
      stationButton.classList.add('active');
      stationMenu.classList.add('station-popup-active');
      this.stationPopupActive = true;
    }
  }

  createStation() {

  }

  seeAllStations() {

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

  playSong() {
    if (this.audioElement.paused) {
      this.audioElement.play();
      this.isPlaying = true;
      document.getElementById("playButton").innerHTML="pause";
    } else {
      this.audioElement.pause();
      this.isPlaying = false;
      document.getElementById("playButton").innerHTML="play_arrow";
    }
  }


}
