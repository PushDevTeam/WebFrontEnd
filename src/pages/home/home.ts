/**
 * Created by Javes on 3/19/2017.
 */
import { Component } from '@angular/core';
import { BrowsePanel} from '../../components/browse-panel/browse-panel.component';
import { NowPlaying } from '../../components/now-playing/now-playing.component';
import {RadioSidepanel} from '../../components/radio-sidepanel/radio-sidepanel.component';
import {UserSidepanel} from '../../components/user-sidepanel/user-sidepanel.component';

import { NavController } from 'ionic-angular';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {



  constructor(public navCtrl: NavController,
    private userService: UserService) {



  }

  ngOnInit(){

    //this.navCtrl.setRoot(Home);
  }
  getEmail(){
    return this.userService.getEmail();
  }
}
