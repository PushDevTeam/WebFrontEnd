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
  private username: string;


  constructor(public navCtrl: NavController,
    private userService: UserService) {



  }

  ngOnInit(){
    this.username = this.userService.getUsername();
    console.log("Home");
    console.log(this.username);
    // this.navCtrl.setRoot(Home);
  }

}
