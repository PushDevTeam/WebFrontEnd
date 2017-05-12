/**
 * Created by NAS on 5/11/2017.
 */
/**
 * Created by Javes on 5/11/2017.
 */
import {Component} from '@angular/core'
import {ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'dropdown.html'
})
export class DropDown {

  constructor(public viewCtrl: ViewController){}
    close() {
      this.viewCtrl.dismiss();
    }
}
