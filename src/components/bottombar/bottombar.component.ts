/**
 * Created by Javes on 5/7/2017.
 */
import {Component} from '@angular/core';
import {TimeDisplayPipe} from "../../pipes/timedisplay.pipe";
import {PandoraService} from '../../services/pandora.service';
import {PandoraPlaybackService} from '../../services/pandora-playback.service';
@Component({
  selector: 'bottombar',
  templateUrl: 'bottombar.component.html'
})

export class BottomBar {
  private stationPopupActive: boolean = false;
  private hideSearchIcon: boolean = false;
  private stationShowLimit: number = 3;
  constructor(private pandoraService: PandoraService,
              private pandoraPlaybackService: PandoraPlaybackService) {}

  ngOnInit() {
    this.pandoraService.getStationList().then(()=>{
      this.pandoraPlaybackService.initializePlayer();
      this.pandoraPlaybackService.nextSong();
   });
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

  onThumbsDown() {
    let pandora = this.pandoraService;
    pandora.addFeedback(pandora.currentStation.stationToken, pandora.currentSong.trackToken, pandora.currentSong.songIdentity, 0); 
    this.pandoraPlaybackService.nextSong();
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

  removeSearchIcon() {
    this.hideSearchIcon = true;
  }

  addSearchIcon() {
    this.hideSearchIcon = false;
  }

}
