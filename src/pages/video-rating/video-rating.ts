import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Home } from '../home/home';

/*
  Created by Nstopa
  3/29/2017

  Modal page to rate videos post-workout
*/

@Component({
  selector: 'page-video-rating',
  templateUrl: 'video-rating.html'
})
export class VideoRatingPage {
//  public videoInfo : VideoInfoObj;
  private id: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
               private viewCtrl: ViewController) {}
  //this.id = this.navParams.get('id');

  ngOnInit() {

  }

onShare() {

    this.navCtrl.push(Home);
}

onSubmit() {
  this.navCtrl.push(Home);
}


onExit() {
  this.navCtrl.push(Home);
}

}
