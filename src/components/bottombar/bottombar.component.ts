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
  private volBarActive: boolean = false;
  constructor() {
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


}
