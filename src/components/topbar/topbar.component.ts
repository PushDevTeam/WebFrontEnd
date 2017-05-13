/**
 * Created by Javes on 5/7/2017.
 */
/**
 * Created by Javes on 5/7/2017.
 */
import {Component} from '@angular/core'
import { Home } from '../../pages/home/home';
import { OnBoardingPage} from '../../pages/on-boarding/on-boarding';
import { NavController} from 'ionic-angular';
import {App} from 'ionic-angular';
import {UserService} from '../../services/user.service';
import {PopoverController} from 'ionic-angular';
import {DropDown} from '../dropdown/dropdown.component';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html',
  host: {
    '(window:scroll)': 'updateHeader($event)'
  },
})
export class TopBar {
  private d: any;
  private popover: any;
  private dropDownActive: boolean = false;

  constructor(protected app: App,
    private userService: UserService,
    public popoverCtrl: PopoverController) {



  }

  onHome() {
    this.app.getActiveNav().setRoot(Home);
  }

  //onContact() {
  //this.app.getActiveNav().setRoot(Home);
  //}

  //getEmail(){
  //  return this.userService.getEmail();
  //}
  dropdown() {
    let menu = document.getElementById('drop-menu');
    let button = document.getElementById('topbar-drop-button');
    if (this.dropDownActive) {
      button.classList.remove('active');
      menu.classList.remove('drop-menu-active');
      this.dropDownActive = false;
    } else {
      button.classList.add('active');
      menu.className += ' drop-menu-active';
      this.dropDownActive = true;
    }
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(DropDown);

    popover.present({
      ev: myEvent
    });
  }
  updateHeader(evt){
    alert();
  }
}
