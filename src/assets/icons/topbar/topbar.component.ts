/**
 * Created by Javes on 5/7/2017.
 */
/**
 * Created by Javes on 5/7/2017.
 */
import {Component} from '@angular/core'


@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html'
})
export class TopBar {
  private d: any;

  constructor(){
    this.d = new Date();
    console.log(this.d.getTime());
  }

  onInit(){

  }
}
