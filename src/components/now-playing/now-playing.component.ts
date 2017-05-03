import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'now-playing',
  templateUrl: 'now-playing.component.html',

})

export class NowPlaying {
 constructor(private userService: UserService) {

 }

}
