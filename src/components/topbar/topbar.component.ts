/**
 * Created by Javes on 5/7/2017.
 */
/**
 * Created by Javes on 5/7/2017.
 */
import {Component} from '@angular/core'
import { Home } from '../../pages/home/home';
import { NavController} from 'ionic-angular';
import {App} from 'ionic-angular';
import {UserService} from '../../services/user.service';
import {PopoverController} from 'ionic-angular';
import {DropDown} from '../dropdown/dropdown';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html'
})
export class TopBar {
  private d: any;

  constructor(protected app: App, private userService: UserService, public popoverCtrl: PopoverController){
    //this.d = new Date();
    //console.log(this.d.getTime());

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

openPopover(myEvent) {
  let popover = this.popoverCtrl.create(DropDown);
  popover.present({
    ev: myEvent
  });
}

}
