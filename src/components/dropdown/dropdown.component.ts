/**
 * Created by NAS on 5/11/2017.
 */
/**
 * Created by NAS on 5/11/2017.
 */
import {Component} from '@angular/core'
import {ViewController} from 'ionic-angular';

@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.component.html'
})

export class DropDown {

  constructor(public viewCtrl: ViewController) {}


    close() {
      this.viewCtrl.dismiss();
    }
}
