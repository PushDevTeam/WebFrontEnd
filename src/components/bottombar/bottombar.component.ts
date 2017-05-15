/**
 * Created by Javes on 5/7/2017.
 */
import {Component} from '@angular/core'


@Component({
  selector: 'bottombar',
  templateUrl: 'bottombar.component.html'
})

export class BottomBar {
  private stationPopupActive: boolean = false;
  constructor(){
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

}
