/**
 * Created by Javes on 3/19/2017.
 */
import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'user-sidepanel',
  templateUrl: 'user-sidepanel.component.html',

})
export class UserSidepanel {
 constructor(private userService: UserService) {
 }



}
