/**
 * Created by Javes on 3/19/2017.
 */
import { Component, HostListener } from '@angular/core';
import { BrowsePanel} from '../../components/browse-panel/browse-panel.component';
import { NowPlaying } from '../../components/now-playing/now-playing.component';
import {RadioSidepanel} from '../../components/radio-sidepanel/radio-sidepanel.component';
import {UserSidepanel} from '../../components/user-sidepanel/user-sidepanel.component';
import {Feature} from '../../components/feature/feature.component';

import { NavController } from 'ionic-angular';
import {UserService, EXERCISES_TYPES} from '../../services/user.service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  private d:any;
  private set_array =
  [
    {'title': 'Popular Trainers', 'description': 'Teaches bodyweight, strength, and dance formats', 'trainer': 'Nnanna Egbujiobi', 'trainer_img': 'assets/icons/profile.svg'},
    {'id': null, 'title': 'My Workouts'},
    {'id': null, 'title': 'Popular Workouts'},
    {'title': 'Other Category'},
  ];

  constructor(public navCtrl: NavController,
    private userService: UserService) {

  }
  exercisesList = EXERCISES_TYPES;

  getEmail(){
    return this.userService.getEmail();
  }
  @HostListener('scroll') onScroll(event){
  //#console.log("scrollll");
  }
}
