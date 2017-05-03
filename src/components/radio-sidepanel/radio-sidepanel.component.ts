import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'radio-sidepanel',
  templateUrl: 'radio-sidepanel.component.html',
})

export class RadioSidepanel {

 constructor(private userService: UserService) {
 }

}
