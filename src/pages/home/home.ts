/**
 * Created by Javes on 3/19/2017.
 */
import { Component } from '@angular/core';

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
